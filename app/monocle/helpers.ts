import { createClient } from "@/utils/supabase/client";
import { Article } from "@/types/abr";
import { Database } from "@/types/database.types";

type DbArticle = Database["public"]["Tables"]["articles"]["Row"];
type DbPerson = Database["public"]["Tables"]["people"]["Row"];
type DbCategory = Database["public"]["Tables"]["categories"]["Row"];
type DbEdition = Database["public"]["Tables"]["editions"]["Row"];

interface ArticleWithRelations extends DbArticle {
  author: DbPerson | null;
  category: DbCategory | null;
  edition:
    | (DbEdition & {
        publication_id: number;
      })
    | null;
}

// Use database type for Edition
export type Edition = DbEdition & {
  articleCount?: number;
};

// Re-export Article type for convenience
export type { Article };

// Monocle has publication_id = 2
const MONOCLE_PUBLICATION_ID = 2;

export async function fetchMonocleEditions(): Promise<Edition[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("editions")
    .select("*")
    .eq("publication_id", MONOCLE_PUBLICATION_ID)
    .eq("status", "published")
    .order("publication_date", { ascending: false });

  if (error) {
    console.error("Error fetching monocle editions:", error);
    throw new Error("Failed to load editions");
  }

  // Get article count for each edition
  const editionsWithCounts = await Promise.all(
    (data || []).map(async (edition) => {
      const { count } = await supabase
        .from("articles")
        .select("*", { count: "exact", head: true })
        .eq("edition_id", edition.id)
        .eq("status", "published");

      return {
        ...edition,
        articleCount: count || 0,
      };
    })
  );

  return editionsWithCounts;
}

export async function fetchArticlesByEdition(
  editionId: number
): Promise<Article[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("articles")
    .select(
      `
            *,
            author:people!articles_author_id_fkey(id, full_name, profile_image),
            category:categories(id, name, color)
        `
    )
    .eq("status", "published")
    .eq("edition_id", editionId)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching articles by edition:", error);
    throw new Error("Failed to load articles");
  }

  const transformedArticles: Article[] =
    (data as ArticleWithRelations[] | null)?.map((article) => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt || "",
      author: article.author?.full_name || "Unknown Author",
      publishDate: article.published_at || article.created_at || "",
      readTime: article.read_time
        ? `${article.read_time} min read`
        : "5 min read",
      imageUrl:
        article.featured_image ||
        "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&w=2070&q=80",
      link: `/article/${article.slug}`,
      category: article.category?.name || "Uncategorized",
    })) ?? [];

  return transformedArticles;
}

export async function fetchEditionById(
  editionId: number
): Promise<Edition | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("editions")
    .select("*")
    .eq("id", editionId)
    .eq("publication_id", MONOCLE_PUBLICATION_ID)
    .single();

  if (error) {
    console.error("Error fetching edition:", error);
    throw new Error("Edition not found");
  }

  return data;
}
