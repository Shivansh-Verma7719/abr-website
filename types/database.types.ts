export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      article_comments: {
        Row: {
          article_id: number | null
          commenter_id: number
          content: string
          created_at: string | null
          id: number
          is_internal: boolean | null
          updated_at: string | null
        }
        Insert: {
          article_id?: number | null
          commenter_id: number
          content: string
          created_at?: string | null
          id?: number
          is_internal?: boolean | null
          updated_at?: string | null
        }
        Update: {
          article_id?: number | null
          commenter_id?: number
          content?: string
          created_at?: string | null
          id?: number
          is_internal?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "article_comments_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_comments_commenter_id_fkey"
            columns: ["commenter_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      article_status_history: {
        Row: {
          article_id: number | null
          changed_by: number
          comment: string | null
          created_at: string | null
          from_status: string | null
          id: number
          to_status: string
        }
        Insert: {
          article_id?: number | null
          changed_by: number
          comment?: string | null
          created_at?: string | null
          from_status?: string | null
          id?: number
          to_status: string
        }
        Update: {
          article_id?: number | null
          changed_by?: number
          comment?: string | null
          created_at?: string | null
          from_status?: string | null
          id?: number
          to_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_status_history_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_status_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      article_tags: {
        Row: {
          article_id: number
          tag_id: number
        }
        Insert: {
          article_id: number
          tag_id: number
        }
        Update: {
          article_id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "article_tags_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          author_id: number
          category_id: number | null
          content: string
          created_at: string | null
          created_by: number
          edition_id: number | null
          excerpt: string | null
          featured_image: string | null
          id: number
          is_featured: boolean | null
          last_edited_by: number | null
          likes: number | null
          published_at: string | null
          read_time: number | null
          slug: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id: number
          category_id?: number | null
          content: string
          created_at?: string | null
          created_by: number
          edition_id?: number | null
          excerpt?: string | null
          featured_image?: string | null
          id?: number
          is_featured?: boolean | null
          last_edited_by?: number | null
          likes?: number | null
          published_at?: string | null
          read_time?: number | null
          slug: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: number
          category_id?: number | null
          content?: string
          created_at?: string | null
          created_by?: number
          edition_id?: number | null
          excerpt?: string | null
          featured_image?: string | null
          id?: number
          is_featured?: boolean | null
          last_edited_by?: number | null
          likes?: number | null
          published_at?: string | null
          read_time?: number | null
          slug?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_edition_id_fkey"
            columns: ["edition_id"]
            isOneToOne: false
            referencedRelation: "editions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_last_edited_by_fkey"
            columns: ["last_edited_by"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          id: number
          name: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: number
          name: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      editions: {
        Row: {
          cover_image: string | null
          created_at: string | null
          description: string | null
          id: number
          publication_date: string | null
          publication_id: number
          status: string | null
          subtitle: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          publication_date?: string | null
          publication_id: number
          status?: string | null
          subtitle?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          publication_date?: string | null
          publication_id?: number
          status?: string | null
          subtitle?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "editions_publication_id_fkey"
            columns: ["publication_id"]
            isOneToOne: false
            referencedRelation: "publications"
            referencedColumns: ["id"]
          },
        ]
      }
      people: {
        Row: {
          can_login: boolean | null
          created_at: string | null
          display_order: number | null
          email: string | null
          full_name: string | null
          id: number
          instagram: string | null
          is_active: boolean | null
          linkedin: string | null
          profile_image: string | null
          role_id: number | null
          team_id: number | null
          twitter: string | null
        }
        Insert: {
          can_login?: boolean | null
          created_at?: string | null
          display_order?: number | null
          email?: string | null
          full_name?: string | null
          id?: number
          instagram?: string | null
          is_active?: boolean | null
          linkedin?: string | null
          profile_image?: string | null
          role_id?: number | null
          team_id?: number | null
          twitter?: string | null
        }
        Update: {
          can_login?: boolean | null
          created_at?: string | null
          display_order?: number | null
          email?: string | null
          full_name?: string | null
          id?: number
          instagram?: string | null
          is_active?: boolean | null
          linkedin?: string | null
          profile_image?: string | null
          role_id?: number | null
          team_id?: number | null
          twitter?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "people_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "people_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      people_permissions: {
        Row: {
          created_at: string | null
          expires_at: string | null
          granted_at: string | null
          granted_by: number | null
          id: number
          notes: string | null
          permission_id: string | null
          person_id: number | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          granted_at?: string | null
          granted_by?: number | null
          id?: number
          notes?: string | null
          permission_id?: string | null
          person_id?: number | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          granted_at?: string | null
          granted_by?: number | null
          id?: number
          notes?: string | null
          permission_id?: string | null
          person_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "people_permissions_granted_by_fkey"
            columns: ["granted_by"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "people_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "people_permissions_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      permissions: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          key: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id: string
          key?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          key?: string | null
        }
        Relationships: []
      }
      publications: {
        Row: {
          cover_image: string | null
          created_at: string | null
          description: string | null
          id: number
          is_active: boolean | null
          name: string
          slug: string
          type: string
        }
        Insert: {
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          name: string
          slug: string
          type: string
        }
        Update: {
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          name?: string
          slug?: string
          type?: string
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      tags: {
        Row: {
          color: string | null
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      teams: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_person_id: { Args: never; Returns: number }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
