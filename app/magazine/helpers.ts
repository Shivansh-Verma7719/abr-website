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

// Magazine has publication_id = 1
const MAGAZINE_PUBLICATION_ID = 1;

export async function fetchMagazineArticles(): Promise<Article[]> {
  const supabase = createClient();

  // Fetch articles that belong to editions with publication_id = 1
  const { data, error } = await supabase
    .from("articles")
    .select(
      `
            *,
            author:people!articles_author_id_fkey(id, full_name, profile_image),
            category:categories(id, name, color),
            edition:editions!articles_edition_id_fkey(
                id,
                title,
                issue_number,
                publication_id
            )
        `
    )
    .eq("status", "published")
    .not("edition_id", "is", null)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching magazine articles:", error);
    throw new Error("Failed to load articles");
  }

  // Filter articles where edition.publication_id = 1 (Magazine)
  const magazineArticles =
    (data as ArticleWithRelations[] | null)?.filter(
      (article) => article.edition?.publication_id === MAGAZINE_PUBLICATION_ID
    ) || [];

  // Transform to Article type
  const transformedArticles: Article[] = magazineArticles.map((article) => ({
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
  }));

  return transformedArticles;
}
