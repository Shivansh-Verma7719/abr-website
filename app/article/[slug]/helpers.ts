import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/database.types";

type Article = Database["public"]["Tables"]["articles"]["Row"];
type Person = Database["public"]["Tables"]["people"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];
type Edition = Database["public"]["Tables"]["editions"]["Row"];
type Publication = Database["public"]["Tables"]["publications"]["Row"];

export interface ArticleData extends Article {
  author: Person | null;
  category: Category | null;
  edition:
    | (Edition & {
        publication: Publication | null;
      })
    | null;
}

export async function fetchArticleBySlug(
  slug: string
): Promise<ArticleData | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("articles")
    .select(
      `
            *,
            author:people!articles_author_id_fkey(id, full_name, email, profile_image),
            category:categories(id, name, color),
            edition:editions!articles_edition_id_fkey(
                id,
                title,
                publication:publications(id, name, type)
            )
        `
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    console.error("Error fetching article:", error);
    throw new Error("Article not found");
  }

  return data as ArticleData;
}
