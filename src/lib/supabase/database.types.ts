export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string | null
          country: string | null
          created_at: string
          id: string
          line_1: string | null
          line_2: string | null
          postal_code: string | null
          state: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          line_1?: string | null
          line_2?: string | null
          postal_code?: string | null
          state?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          line_1?: string | null
          line_2?: string | null
          postal_code?: string | null
          state?: string | null
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          amount: number | null
          cart_id: string | null
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          product_id: number | null
          quantity: number | null
        }
        Insert: {
          amount?: number | null
          cart_id?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          product_id?: number | null
          quantity?: number | null
        }
        Update: {
          amount?: number | null
          cart_id?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          product_id?: number | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      carts: {
        Row: {
          created_at: string
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      countries: {
        Row: {
          id: number
          iso_code: string | null
          name: string | null
        }
        Insert: {
          id?: number
          iso_code?: string | null
          name?: string | null
        }
        Update: {
          id?: number
          iso_code?: string | null
          name?: string | null
        }
        Relationships: []
      }
      email_labels: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      email_messages: {
        Row: {
          email_id: number | null
          historyId: string | null
          id: string
          parsed_message: Json | null
          raw_message: string | null
          received_at: string | null
          recipient: string | null
          sender: string | null
          snippet: string | null
          thread_id: string | null
        }
        Insert: {
          email_id?: number | null
          historyId?: string | null
          id: string
          parsed_message?: Json | null
          raw_message?: string | null
          received_at?: string | null
          recipient?: string | null
          sender?: string | null
          snippet?: string | null
          thread_id?: string | null
        }
        Update: {
          email_id?: number | null
          historyId?: string | null
          id?: string
          parsed_message?: Json | null
          raw_message?: string | null
          received_at?: string | null
          recipient?: string | null
          sender?: string | null
          snippet?: string | null
          thread_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_messages_email_id_fkey"
            columns: ["email_id"]
            isOneToOne: false
            referencedRelation: "emails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "email_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      email_messages_labels: {
        Row: {
          id: number
          label_id: number | null
          message_id: string | null
        }
        Insert: {
          id?: number
          label_id?: number | null
          message_id?: string | null
        }
        Update: {
          id?: number
          label_id?: number | null
          message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_messages_labels_label_id_fkey"
            columns: ["label_id"]
            isOneToOne: false
            referencedRelation: "email_labels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_messages_labels_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "email_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      email_threads: {
        Row: {
          email_id: number | null
          history_id: string | null
          id: string
        }
        Insert: {
          email_id?: number | null
          history_id?: string | null
          id: string
        }
        Update: {
          email_id?: number | null
          history_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_threads_email_id_fkey"
            columns: ["email_id"]
            isOneToOne: false
            referencedRelation: "emails"
            referencedColumns: ["id"]
          },
        ]
      }
      emails: {
        Row: {
          access_token: string | null
          address: string | null
          created_at: string
          expires_at: string | null
          id: number
          refresh_token: string | null
        }
        Insert: {
          access_token?: string | null
          address?: string | null
          created_at?: string
          expires_at?: string | null
          id?: number
          refresh_token?: string | null
        }
        Update: {
          access_token?: string | null
          address?: string | null
          created_at?: string
          expires_at?: string | null
          id?: number
          refresh_token?: string | null
        }
        Relationships: []
      }
      item_configurations: {
        Row: {
          bg_filter: string | null
          bg_transform: string | null
          bg_url: string | null
          cart_item_id: string | null
          created_at: string
          edit_details: string | null
          id: string
          main_filter: string | null
          main_transform: string | null
          main_url: string | null
          orientation: string | null
          remove_bg: string | null
          restore: string | null
          size_id: number | null
          thumbnail_url: string | null
          url: string | null
          wants_edit: string | null
          wants_preview: string | null
        }
        Insert: {
          bg_filter?: string | null
          bg_transform?: string | null
          bg_url?: string | null
          cart_item_id?: string | null
          created_at?: string
          edit_details?: string | null
          id?: string
          main_filter?: string | null
          main_transform?: string | null
          main_url?: string | null
          orientation?: string | null
          remove_bg?: string | null
          restore?: string | null
          size_id?: number | null
          thumbnail_url?: string | null
          url?: string | null
          wants_edit?: string | null
          wants_preview?: string | null
        }
        Update: {
          bg_filter?: string | null
          bg_transform?: string | null
          bg_url?: string | null
          cart_item_id?: string | null
          created_at?: string
          edit_details?: string | null
          id?: string
          main_filter?: string | null
          main_transform?: string | null
          main_url?: string | null
          orientation?: string | null
          remove_bg?: string | null
          restore?: string | null
          size_id?: number | null
          thumbnail_url?: string | null
          url?: string | null
          wants_edit?: string | null
          wants_preview?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "item_configurations_cart_item_id_fkey"
            columns: ["cart_item_id"]
            isOneToOne: false
            referencedRelation: "cart_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_configurations_size_id_fkey"
            columns: ["size_id"]
            isOneToOne: false
            referencedRelation: "product_sizes"
            referencedColumns: ["id"]
          },
        ]
      }
      order_activities: {
        Row: {
          attachment_url: string | null
          comment: string | null
          created_at: string
          id: number
          order_id: string | null
          title: string | null
          type: Database["public"]["Enums"]["order_activity_types"] | null
          user_id: string | null
        }
        Insert: {
          attachment_url?: string | null
          comment?: string | null
          created_at?: string
          id?: number
          order_id?: string | null
          title?: string | null
          type?: Database["public"]["Enums"]["order_activity_types"] | null
          user_id?: string | null
        }
        Update: {
          attachment_url?: string | null
          comment?: string | null
          created_at?: string
          id?: number
          order_id?: string | null
          title?: string | null
          type?: Database["public"]["Enums"]["order_activity_types"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_activities_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_activities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      order_item_totals: {
        Row: {
          amount_discount: number | null
          amount_refunded: number | null
          amount_subtotal: number | null
          amount_tax: number | null
          amount_total: number | null
          currency: string | null
          id: string
          stripe_price_id: string | null
          stripe_product_id: string | null
        }
        Insert: {
          amount_discount?: number | null
          amount_refunded?: number | null
          amount_subtotal?: number | null
          amount_tax?: number | null
          amount_total?: number | null
          currency?: string | null
          id?: string
          stripe_price_id?: string | null
          stripe_product_id?: string | null
        }
        Update: {
          amount_discount?: number | null
          amount_refunded?: number | null
          amount_subtotal?: number | null
          amount_tax?: number | null
          amount_total?: number | null
          currency?: string | null
          id?: string
          stripe_price_id?: string | null
          stripe_product_id?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          cart_item_id: string | null
          configuration_id: string | null
          created_at: string
          description: string | null
          id: string
          order_id: string | null
          product_id: number | null
          quantity: number | null
          totals_id: string | null
        }
        Insert: {
          cart_item_id?: string | null
          configuration_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          order_id?: string | null
          product_id?: number | null
          quantity?: number | null
          totals_id?: string | null
        }
        Update: {
          cart_item_id?: string | null
          configuration_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          order_id?: string | null
          product_id?: number | null
          quantity?: number | null
          totals_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_cart_item_id_fkey"
            columns: ["cart_item_id"]
            isOneToOne: false
            referencedRelation: "cart_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_configuration_id_fkey"
            columns: ["configuration_id"]
            isOneToOne: false
            referencedRelation: "item_configurations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_totals_id_fkey"
            columns: ["totals_id"]
            isOneToOne: true
            referencedRelation: "order_item_totals"
            referencedColumns: ["id"]
          },
        ]
      }
      order_payments: {
        Row: {
          details: Json | null
          id: string
          invoice_url: string | null
          status: Database["public"]["Enums"]["payment_status"] | null
        }
        Insert: {
          details?: Json | null
          id?: string
          invoice_url?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
        }
        Update: {
          details?: Json | null
          id?: string
          invoice_url?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
        }
        Relationships: []
      }
      order_statuses: {
        Row: {
          id: string
          name: Database["public"]["Enums"]["enum_order_status"] | null
          timestamp: string | null
        }
        Insert: {
          id?: string
          name?: Database["public"]["Enums"]["enum_order_status"] | null
          timestamp?: string | null
        }
        Update: {
          id?: string
          name?: Database["public"]["Enums"]["enum_order_status"] | null
          timestamp?: string | null
        }
        Relationships: []
      }
      order_totals: {
        Row: {
          amount_discount: number | null
          amount_refunded: number | null
          amount_shipping: number | null
          amount_subtotal: number | null
          amount_tax: number | null
          amount_total: number | null
          currency: string | null
          id: string
        }
        Insert: {
          amount_discount?: number | null
          amount_refunded?: number | null
          amount_shipping?: number | null
          amount_subtotal?: number | null
          amount_tax?: number | null
          amount_total?: number | null
          currency?: string | null
          id?: string
        }
        Update: {
          amount_discount?: number | null
          amount_refunded?: number | null
          amount_shipping?: number | null
          amount_subtotal?: number | null
          amount_tax?: number | null
          amount_total?: number | null
          currency?: string | null
          id?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          billing_address_id: string | null
          created_at: string | null
          display_name: string | null
          email: string | null
          id: string
          last_updated: string | null
          name: string | null
          payment_id: string | null
          phone: string | null
          shipping_address_id: string | null
          status_id: string | null
          stripe_checkout_id: string | null
          totals_id: string | null
          user_id: string | null
        }
        Insert: {
          billing_address_id?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          last_updated?: string | null
          name?: string | null
          payment_id?: string | null
          phone?: string | null
          shipping_address_id?: string | null
          status_id?: string | null
          stripe_checkout_id?: string | null
          totals_id?: string | null
          user_id?: string | null
        }
        Update: {
          billing_address_id?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          last_updated?: string | null
          name?: string | null
          payment_id?: string | null
          phone?: string | null
          shipping_address_id?: string | null
          status_id?: string | null
          stripe_checkout_id?: string | null
          totals_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_billing_address_id_fkey"
            columns: ["billing_address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "order_payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_shipping_address_id_fkey"
            columns: ["shipping_address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "order_statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_totals_id_fkey"
            columns: ["totals_id"]
            isOneToOne: false
            referencedRelation: "order_totals"
            referencedColumns: ["id"]
          },
        ]
      }
      product_backgrounds: {
        Row: {
          id: number
          url: string | null
        }
        Insert: {
          id?: number
          url?: string | null
        }
        Update: {
          id?: number
          url?: string | null
        }
        Relationships: []
      }
      product_images: {
        Row: {
          height: number | null
          id: number
          left_margin: number | null
          product_id: number | null
          size_id: number | null
          top_margin: number | null
          url: string | null
          width: number | null
        }
        Insert: {
          height?: number | null
          id?: number
          left_margin?: number | null
          product_id?: number | null
          size_id?: number | null
          top_margin?: number | null
          url?: string | null
          width?: number | null
        }
        Update: {
          height?: number | null
          id?: number
          left_margin?: number | null
          product_id?: number | null
          size_id?: number | null
          top_margin?: number | null
          url?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_images_size_id_fkey"
            columns: ["size_id"]
            isOneToOne: false
            referencedRelation: "product_sizes"
            referencedColumns: ["id"]
          },
        ]
      }
      product_prices: {
        Row: {
          amount: number | null
          country_id: number | null
          id: number
          product_id: number | null
          size_id: number | null
        }
        Insert: {
          amount?: number | null
          country_id?: number | null
          id?: number
          product_id?: number | null
          size_id?: number | null
        }
        Update: {
          amount?: number | null
          country_id?: number | null
          id?: number
          product_id?: number | null
          size_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prices_product_size_id_fkey"
            columns: ["size_id"]
            isOneToOne: false
            referencedRelation: "product_sizes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_sizes: {
        Row: {
          height_cm: number | null
          height_in: number | null
          id: number
          product_id: number | null
          template_url: string | null
          width_cm: number | null
          width_in: number | null
        }
        Insert: {
          height_cm?: number | null
          height_in?: number | null
          id?: number
          product_id?: number | null
          template_url?: string | null
          width_cm?: number | null
          width_in?: number | null
        }
        Update: {
          height_cm?: number | null
          height_in?: number | null
          id?: number
          product_id?: number | null
          template_url?: string | null
          width_cm?: number | null
          width_in?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_sizes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_slugs: {
        Row: {
          country_id: number | null
          id: number
          name: string | null
          product_id: number | null
        }
        Insert: {
          country_id?: number | null
          id?: number
          name?: string | null
          product_id?: number | null
        }
        Update: {
          country_id?: number | null
          id?: number
          name?: string | null
          product_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_slugs_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_slugs_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      service_accounts: {
        Row: {
          created_at: string
          id: number
          key: string | null
          name: string | null
          project_id: string | null
          provider: string | null
          secret: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          key?: string | null
          name?: string | null
          project_id?: string | null
          provider?: string | null
          secret?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          key?: string | null
          name?: string | null
          project_id?: string | null
          provider?: string | null
          secret?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string
          email: string | null
          gender: string | null
          id: string
          name: string | null
          phone: string | null
          picture: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          gender?: string | null
          id: string
          name?: string | null
          phone?: string | null
          picture?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          gender?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          picture?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      enum_order_status:
        | "placed"
        | "edit_pending"
        | "preview_pending"
        | "ready_to_print"
        | "printed"
        | "oven"
        | "shipped"
        | "delivered"
      order_activity_types: "positive" | "monitor" | "critical"
      payment_status:
        | "pending"
        | "failed"
        | "paid"
        | "refunded"
        | "partial_refund"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
