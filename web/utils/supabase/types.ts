export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      articles: {
        Row: {
          author_name: string | null
          body_md_en: string | null
          body_md_th: string
          category: string
          cover_image: string | null
          created_at: string
          excerpt_en: string | null
          excerpt_th: string | null
          id: string
          og_image: string | null
          published_at: string | null
          reading_time: number | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          tags: string[] | null
          title_en: string | null
          title_th: string
          updated_at: string
        }
        Insert: {
          author_name?: string | null
          body_md_en?: string | null
          body_md_th: string
          category: string
          cover_image?: string | null
          created_at?: string
          excerpt_en?: string | null
          excerpt_th?: string | null
          id?: string
          og_image?: string | null
          published_at?: string | null
          reading_time?: number | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          tags?: string[] | null
          title_en?: string | null
          title_th: string
          updated_at?: string
        }
        Update: {
          author_name?: string | null
          body_md_en?: string | null
          body_md_th?: string
          category?: string
          cover_image?: string | null
          created_at?: string
          excerpt_en?: string | null
          excerpt_th?: string | null
          id?: string
          og_image?: string | null
          published_at?: string | null
          reading_time?: number | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          tags?: string[] | null
          title_en?: string | null
          title_th?: string
          updated_at?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          budget: string | null
          created_at: string
          email: string
          id: string
          ip_hash: string | null
          message: string | null
          name: string
          notes: string | null
          phone: string | null
          service: string | null
          source: string | null
          status: Database["public"]["Enums"]["lead_status"]
        }
        Insert: {
          budget?: string | null
          created_at?: string
          email: string
          id?: string
          ip_hash?: string | null
          message?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          service?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
        }
        Update: {
          budget?: string | null
          created_at?: string
          email?: string
          id?: string
          ip_hash?: string | null
          message?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          service?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
        }
        Relationships: []
      }
      portfolio_items: {
        Row: {
          body_md_en: string | null
          body_md_th: string | null
          category: string
          client: string | null
          cover_image: string | null
          created_at: string
          duration: string | null
          featured: boolean | null
          gallery: string[] | null
          id: string
          live_url: string | null
          og_image: string | null
          results: Json | null
          seo_description: string | null
          seo_title: string | null
          services: string[] | null
          slug: string
          sort_order: number | null
          status: Database["public"]["Enums"]["content_status"]
          summary_en: string | null
          summary_th: string
          tech_stack: string[] | null
          testimonial_id: string | null
          title: string
          updated_at: string
          year: number | null
        }
        Insert: {
          body_md_en?: string | null
          body_md_th?: string | null
          category: string
          client?: string | null
          cover_image?: string | null
          created_at?: string
          duration?: string | null
          featured?: boolean | null
          gallery?: string[] | null
          id?: string
          live_url?: string | null
          og_image?: string | null
          results?: Json | null
          seo_description?: string | null
          seo_title?: string | null
          services?: string[] | null
          slug: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          summary_en?: string | null
          summary_th: string
          tech_stack?: string[] | null
          testimonial_id?: string | null
          title: string
          updated_at?: string
          year?: number | null
        }
        Update: {
          body_md_en?: string | null
          body_md_th?: string | null
          category?: string
          client?: string | null
          cover_image?: string | null
          created_at?: string
          duration?: string | null
          featured?: boolean | null
          gallery?: string[] | null
          id?: string
          live_url?: string | null
          og_image?: string | null
          results?: Json | null
          seo_description?: string | null
          seo_title?: string | null
          services?: string[] | null
          slug?: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          summary_en?: string | null
          summary_th?: string
          tech_stack?: string[] | null
          testimonial_id?: string | null
          title?: string
          updated_at?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_testimonial_fk"
            columns: ["testimonial_id"]
            isOneToOne: false
            referencedRelation: "testimonials"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          body_md_en: string | null
          body_md_th: string | null
          created_at: string
          features_en: string[] | null
          features_th: string[] | null
          hero_image: string | null
          icon: string | null
          id: string
          name_en: string | null
          name_th: string
          pricing_tiers: Json | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number | null
          status: Database["public"]["Enums"]["content_status"]
          summary_en: string | null
          summary_th: string
          updated_at: string
        }
        Insert: {
          body_md_en?: string | null
          body_md_th?: string | null
          created_at?: string
          features_en?: string[] | null
          features_th?: string[] | null
          hero_image?: string | null
          icon?: string | null
          id?: string
          name_en?: string | null
          name_th: string
          pricing_tiers?: Json | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          summary_en?: string | null
          summary_th: string
          updated_at?: string
        }
        Update: {
          body_md_en?: string | null
          body_md_th?: string | null
          created_at?: string
          features_en?: string[] | null
          features_th?: string[] | null
          hero_image?: string | null
          icon?: string | null
          id?: string
          name_en?: string | null
          name_th?: string
          pricing_tiers?: Json | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["content_status"]
          summary_en?: string | null
          summary_th?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          description: string | null
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          description?: string | null
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          description?: string | null
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          client_avatar: string | null
          client_company: string | null
          client_name: string
          client_role: string | null
          created_at: string
          featured: boolean | null
          id: string
          quote_en: string | null
          quote_th: string
          rating: number | null
          related_portfolio_id: string | null
          related_service_id: string | null
          sort_order: number | null
        }
        Insert: {
          client_avatar?: string | null
          client_company?: string | null
          client_name: string
          client_role?: string | null
          created_at?: string
          featured?: boolean | null
          id?: string
          quote_en?: string | null
          quote_th: string
          rating?: number | null
          related_portfolio_id?: string | null
          related_service_id?: string | null
          sort_order?: number | null
        }
        Update: {
          client_avatar?: string | null
          client_company?: string | null
          client_name?: string
          client_role?: string | null
          created_at?: string
          featured?: boolean | null
          id?: string
          quote_en?: string | null
          quote_th?: string
          rating?: number | null
          related_portfolio_id?: string | null
          related_service_id?: string | null
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_related_portfolio_id_fkey"
            columns: ["related_portfolio_id"]
            isOneToOne: false
            referencedRelation: "portfolio_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonials_related_service_id_fkey"
            columns: ["related_service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      content_status: "draft" | "published" | "archived"
      lead_status: "new" | "contacted" | "qualified" | "closed" | "lost"
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
  public: {
    Enums: {
      content_status: ["draft", "published", "archived"],
      lead_status: ["new", "contacted", "qualified", "closed", "lost"],
    },
  },
} as const

// =============================================================================
// Convenience aliases — used across queries.ts and pages.
// Row types from Database, plus narrowed JSON types for arrays-of-objects.
// =============================================================================

export type ContentStatus = Database["public"]["Enums"]["content_status"]
export type LeadStatus = Database["public"]["Enums"]["lead_status"]

export type Article = Tables<"articles">
export type Service = Tables<"services">
export type Testimonial = Tables<"testimonials">
export type Lead = Tables<"leads">
export type SiteSetting = Tables<"site_settings">

export type PortfolioResult = {
  metric: string
  value: string
  label: string
}

export type PricingTier = {
  name: string
  price: string
  features: string[]
}

export type PortfolioItem = Omit<Tables<"portfolio_items">, "results"> & {
  results: PortfolioResult[] | null
}
