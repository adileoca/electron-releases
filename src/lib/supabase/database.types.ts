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
      attribute_values: {
        Row: {
          attribute_id: number | null
          id: number
          label: string | null
        }
        Insert: {
          attribute_id?: number | null
          id?: number
          label?: string | null
        }
        Update: {
          attribute_id?: number | null
          id?: number
          label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attribute_values_attribute_id_fkey"
            columns: ["attribute_id"]
            isOneToOne: false
            referencedRelation: "attributes"
            referencedColumns: ["id"]
          },
        ]
      }
      attributes: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      call_logs: {
        Row: {
          call_sid: string
          created_at: string
          from: string
          id: string
          recording: string | null
          to: string
          transcript: Json | null
        }
        Insert: {
          call_sid: string
          created_at?: string
          from: string
          id?: string
          recording?: string | null
          to: string
          transcript?: Json | null
        }
        Update: {
          call_sid?: string
          created_at?: string
          from?: string
          id?: string
          recording?: string | null
          to?: string
          transcript?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "call_logs_recording_fkey"
            columns: ["recording"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_items: {
        Row: {
          amount: number | null
          cart_id: string | null
          configuration_id: string | null
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
          configuration_id?: string | null
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
          configuration_id?: string | null
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
            foreignKeyName: "cart_items_configuration_id_fkey"
            columns: ["configuration_id"]
            isOneToOne: false
            referencedRelation: "item_configurations"
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
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "carts_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      dialed_numbers: {
        Row: {
          call_sid: string
          created_at: string
          dialed_number: string
          id: string
          status: Database["public"]["Enums"]["call_statuses"]
        }
        Insert: {
          call_sid: string
          created_at?: string
          dialed_number: string
          id?: string
          status: Database["public"]["Enums"]["call_statuses"]
        }
        Update: {
          call_sid?: string
          created_at?: string
          dialed_number?: string
          id?: string
          status?: Database["public"]["Enums"]["call_statuses"]
        }
        Relationships: [
          {
            foreignKeyName: "dialed_numbers_call_sid_fkey"
            columns: ["call_sid"]
            isOneToOne: false
            referencedRelation: "call_logs"
            referencedColumns: ["call_sid"]
          },
        ]
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
      item_asset_attachments: {
        Row: {
          asset_id: string
          media_id: string
        }
        Insert: {
          asset_id: string
          media_id: string
        }
        Update: {
          asset_id?: string
          media_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "item_asset_attachments_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "item_assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_asset_attachments_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      item_assets: {
        Row: {
          approved: boolean
          comment: string | null
          created_at: string
          created_by: string
          id: string
          item_id: string
          locked: boolean
          locked_by: string | null
          locked_until: string
          print_id: string | null
          printed: boolean
          psd_id: string
          seen: boolean
          sent: boolean
          thumbnail_id: string
          updated_at: string | null
        }
        Insert: {
          approved?: boolean
          comment?: string | null
          created_at?: string
          created_by: string
          id?: string
          item_id: string
          locked?: boolean
          locked_by?: string | null
          locked_until?: string
          print_id?: string | null
          printed?: boolean
          psd_id: string
          seen?: boolean
          sent?: boolean
          thumbnail_id: string
          updated_at?: string | null
        }
        Update: {
          approved?: boolean
          comment?: string | null
          created_at?: string
          created_by?: string
          id?: string
          item_id?: string
          locked?: boolean
          locked_by?: string | null
          locked_until?: string
          print_id?: string | null
          printed?: boolean
          psd_id?: string
          seen?: boolean
          sent?: boolean
          thumbnail_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "item_assets_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_assets_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_assets_print_id_fkey"
            columns: ["print_id"]
            isOneToOne: false
            referencedRelation: "prints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_assets_psd_id_fkey"
            columns: ["psd_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_assets_thumbnail_id_fkey"
            columns: ["thumbnail_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      item_configurations: {
        Row: {
          bg_filter: string | null
          bg_media_id: string | null
          bg_transform: string | null
          created_at: string
          edit_details: string | null
          id: string
          main_filter: string | null
          main_media_id: string | null
          main_transform: string | null
          orientation: string | null
          remove_bg: string | null
          restore: string | null
          size_id: number | null
          text_details: string | null
          thumbnail_url: string | null
          url: string | null
          wants_adhesive: string | null
          wants_edit: string | null
          wants_preview: string | null
        }
        Insert: {
          bg_filter?: string | null
          bg_media_id?: string | null
          bg_transform?: string | null
          created_at?: string
          edit_details?: string | null
          id?: string
          main_filter?: string | null
          main_media_id?: string | null
          main_transform?: string | null
          orientation?: string | null
          remove_bg?: string | null
          restore?: string | null
          size_id?: number | null
          text_details?: string | null
          thumbnail_url?: string | null
          url?: string | null
          wants_adhesive?: string | null
          wants_edit?: string | null
          wants_preview?: string | null
        }
        Update: {
          bg_filter?: string | null
          bg_media_id?: string | null
          bg_transform?: string | null
          created_at?: string
          edit_details?: string | null
          id?: string
          main_filter?: string | null
          main_media_id?: string | null
          main_transform?: string | null
          orientation?: string | null
          remove_bg?: string | null
          restore?: string | null
          size_id?: number | null
          text_details?: string | null
          thumbnail_url?: string | null
          url?: string | null
          wants_adhesive?: string | null
          wants_edit?: string | null
          wants_preview?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "item_configurations_bg_media_id_fkey"
            columns: ["bg_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_configurations_main_media_id_fkey"
            columns: ["main_media_id"]
            isOneToOne: false
            referencedRelation: "media"
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
      media: {
        Row: {
          bucket_name: string
          created_at: string
          error: Json | null
          group_id: string | null
          id: string
          path: string
          scheduled: boolean | null
          upload_end: string | null
          upload_start: string | null
          uploading: boolean | null
          url: string | null
          user_id: string | null
        }
        Insert: {
          bucket_name: string
          created_at?: string
          error?: Json | null
          group_id?: string | null
          id?: string
          path: string
          scheduled?: boolean | null
          upload_end?: string | null
          upload_start?: string | null
          uploading?: boolean | null
          url?: string | null
          user_id?: string | null
        }
        Update: {
          bucket_name?: string
          created_at?: string
          error?: Json | null
          group_id?: string | null
          id?: string
          path?: string
          scheduled?: boolean | null
          upload_end?: string | null
          upload_start?: string | null
          uploading?: boolean | null
          url?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "scheduled_uploads_group"
            referencedColumns: ["id"]
          },
        ]
      }
      media_metadata: {
        Row: {
          expires_at: string
          id: string
        }
        Insert: {
          expires_at: string
          id: string
        }
        Update: {
          expires_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_metadata_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      order_activities: {
        Row: {
          attachment_url: string | null
          comment: string | null
          created_at: string
          description: string | null
          id: number
          item_id: string | null
          order_id: string | null
          task_id: string | null
          type: Database["public"]["Enums"]["order_activity_types"] | null
          user_id: string | null
        }
        Insert: {
          attachment_url?: string | null
          comment?: string | null
          created_at?: string
          description?: string | null
          id?: number
          item_id?: string | null
          order_id?: string | null
          task_id?: string | null
          type?: Database["public"]["Enums"]["order_activity_types"] | null
          user_id?: string | null
        }
        Update: {
          attachment_url?: string | null
          comment?: string | null
          created_at?: string
          description?: string | null
          id?: number
          item_id?: string | null
          order_id?: string | null
          task_id?: string | null
          type?: Database["public"]["Enums"]["order_activity_types"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_activities_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_activities_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_activities_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
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
      order_keys: {
        Row: {
          created_at: string | null
          id: string
          order_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_keys_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_payments: {
        Row: {
          created_at: string | null
          details: Json | null
          id: string
          invoice_url: string | null
          status: Database["public"]["Enums"]["payment_status"] | null
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          id?: string
          invoice_url?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
        }
        Update: {
          created_at?: string | null
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
          name: Database["public"]["Enums"]["order_status_names"] | null
          timestamp: string | null
        }
        Insert: {
          id?: string
          name?: Database["public"]["Enums"]["order_status_names"] | null
          timestamp?: string | null
        }
        Update: {
          id?: string
          name?: Database["public"]["Enums"]["order_status_names"] | null
          timestamp?: string | null
        }
        Relationships: []
      }
      order_tokens: {
        Row: {
          created_at: string
          id: number
          key: string | null
          metadata: Json | null
          order_id: string
          used: boolean | null
          value: string
        }
        Insert: {
          created_at?: string
          id?: number
          key?: string | null
          metadata?: Json | null
          order_id: string
          used?: boolean | null
          value: string
        }
        Update: {
          created_at?: string
          id?: number
          key?: string | null
          metadata?: Json | null
          order_id?: string
          used?: boolean | null
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_tokens_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
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
          phone: string
          session_id: string | null
          shipping_address_id: string | null
          status_id: string
          storefront_id: string
          stripe_checkout_id: string | null
          totals_id: string
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
          phone: string
          session_id?: string | null
          shipping_address_id?: string | null
          status_id: string
          storefront_id: string
          stripe_checkout_id?: string | null
          totals_id: string
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
          phone?: string
          session_id?: string | null
          shipping_address_id?: string | null
          status_id?: string
          storefront_id?: string
          stripe_checkout_id?: string | null
          totals_id?: string
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
            foreignKeyName: "orders_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
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
            foreignKeyName: "orders_storefront_id_fkey"
            columns: ["storefront_id"]
            isOneToOne: false
            referencedRelation: "storefronts"
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
      print_item_assets: {
        Row: {
          item_asset_id: string
          print_id: string
          reprint: boolean | null
        }
        Insert: {
          item_asset_id: string
          print_id: string
          reprint?: boolean | null
        }
        Update: {
          item_asset_id?: string
          print_id?: string
          reprint?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "print_item_assets_item_asset_id_fkey"
            columns: ["item_asset_id"]
            isOneToOne: false
            referencedRelation: "item_assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "print_item_assets_print_id_fkey"
            columns: ["print_id"]
            isOneToOne: false
            referencedRelation: "prints"
            referencedColumns: ["id"]
          },
        ]
      }
      print_templates: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          metadata: Json | null
          name: string
          psd_id: string
          thumbnail_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          metadata?: Json | null
          name: string
          psd_id: string
          thumbnail_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          psd_id?: string
          thumbnail_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "print_templates_media_id_fkey"
            columns: ["psd_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "print_templates_thumbnail_id_fkey"
            columns: ["thumbnail_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      print_versions: {
        Row: {
          created_at: string
          created_by: string | null
          file_id: string
          id: number
          metadata: Json
          name: string
          print_id: string
          thumbnail_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          file_id: string
          id?: number
          metadata: Json
          name: string
          print_id: string
          thumbnail_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          file_id?: string
          id?: number
          metadata?: Json
          name?: string
          print_id?: string
          thumbnail_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "print_versions_created_by_fkey1"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "print_versions_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "print_versions_print_id_fkey"
            columns: ["print_id"]
            isOneToOne: false
            referencedRelation: "prints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "print_versions_thumbnail_id_fkey"
            columns: ["thumbnail_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      prints: {
        Row: {
          created_at: string | null
          id: string
          locked: boolean
          locked_by: string | null
          locked_until: string
          printed: boolean
          template_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          locked?: boolean
          locked_by?: string | null
          locked_until?: string
          printed?: boolean
          template_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          locked?: boolean
          locked_by?: string | null
          locked_until?: string
          printed?: boolean
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prints_locked_by_fkey1"
            columns: ["locked_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prints_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "print_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      product_attributes: {
        Row: {
          attribute_id: number | null
          attribute_value_id: number | null
          id: string
          product_id: number | null
        }
        Insert: {
          attribute_id?: number | null
          attribute_value_id?: number | null
          id?: string
          product_id?: number | null
        }
        Update: {
          attribute_id?: number | null
          attribute_value_id?: number | null
          id?: string
          product_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_attributes_attribute_id_fkey"
            columns: ["attribute_id"]
            isOneToOne: false
            referencedRelation: "attributes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_attributes_attribute_value_fkey"
            columns: ["attribute_value_id"]
            isOneToOne: false
            referencedRelation: "attribute_values"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_attributes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_backgrounds: {
        Row: {
          id: number
          media_id: string | null
          url: string | null
        }
        Insert: {
          id?: number
          media_id?: string | null
          url?: string | null
        }
        Update: {
          id?: number
          media_id?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_backgrounds_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images: {
        Row: {
          height: number | null
          id: number
          is_landscape: boolean | null
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
          is_landscape?: boolean | null
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
          is_landscape?: boolean | null
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
      product_names: {
        Row: {
          id: number
          product_id: number | null
          storefront_id: string | null
          text: string | null
        }
        Insert: {
          id?: number
          product_id?: number | null
          storefront_id?: string | null
          text?: string | null
        }
        Update: {
          id?: number
          product_id?: number | null
          storefront_id?: string | null
          text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_names_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_names_storefront_id_fkey"
            columns: ["storefront_id"]
            isOneToOne: false
            referencedRelation: "storefronts"
            referencedColumns: ["id"]
          },
        ]
      }
      product_prices: {
        Row: {
          amount: number | null
          id: number
          product_id: number | null
          size_id: number | null
          storefront_id: string | null
        }
        Insert: {
          amount?: number | null
          id?: number
          product_id?: number | null
          size_id?: number | null
          storefront_id?: string | null
        }
        Update: {
          amount?: number | null
          id?: number
          product_id?: number | null
          size_id?: number | null
          storefront_id?: string | null
        }
        Relationships: [
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
          {
            foreignKeyName: "product_prices_storefront_id_fkey"
            columns: ["storefront_id"]
            isOneToOne: false
            referencedRelation: "storefronts"
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
          template_id: string | null
          width_cm: number | null
          width_in: number | null
        }
        Insert: {
          height_cm?: number | null
          height_in?: number | null
          id?: number
          product_id?: number | null
          template_id?: string | null
          width_cm?: number | null
          width_in?: number | null
        }
        Update: {
          height_cm?: number | null
          height_in?: number | null
          id?: number
          product_id?: number | null
          template_id?: string | null
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
          {
            foreignKeyName: "product_sizes_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      product_slugs: {
        Row: {
          id: number
          name: string
          product_id: number
          storefront_id: string
        }
        Insert: {
          id?: number
          name: string
          product_id: number
          storefront_id: string
        }
        Update: {
          id?: number
          name?: string
          product_id?: number
          storefront_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_slugs_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_slugs_storefront_id_fkey"
            columns: ["storefront_id"]
            isOneToOne: false
            referencedRelation: "storefronts"
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
      request_logs: {
        Row: {
          body: Json | null
          domain: string | null
          headers: Json | null
          id: number
          metadata: Json | null
          method: Database["public"]["Enums"]["request_methods"] | null
          request_end: string | null
          request_start: string | null
          response: Json | null
          route: string | null
          status_code: number | null
        }
        Insert: {
          body?: Json | null
          domain?: string | null
          headers?: Json | null
          id?: number
          metadata?: Json | null
          method?: Database["public"]["Enums"]["request_methods"] | null
          request_end?: string | null
          request_start?: string | null
          response?: Json | null
          route?: string | null
          status_code?: number | null
        }
        Update: {
          body?: Json | null
          domain?: string | null
          headers?: Json | null
          id?: number
          metadata?: Json | null
          method?: Database["public"]["Enums"]["request_methods"] | null
          request_end?: string | null
          request_start?: string | null
          response?: Json | null
          route?: string | null
          status_code?: number | null
        }
        Relationships: []
      }
      scheduled_uploads_group: {
        Row: {
          created_at: string | null
          id: string
          in_progress: boolean | null
          item_id: string | null
          metadata: Json | null
          task_id: string | null
          uploaded_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          in_progress?: boolean | null
          item_id?: string | null
          metadata?: Json | null
          task_id?: string | null
          uploaded_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          in_progress?: boolean | null
          item_id?: string | null
          metadata?: Json | null
          task_id?: string | null
          uploaded_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_upload_groups_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_upload_groups_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
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
      session_order_tokens: {
        Row: {
          created_at: string | null
          id: string
          key_id: string | null
          session_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          key_id?: string | null
          session_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          key_id?: string | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_order_tokens_key_id_fkey"
            columns: ["key_id"]
            isOneToOne: false
            referencedRelation: "order_keys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_order_tokens_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_replay_events: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          session_id: string | null
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          session_id?: string | null
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_events_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      shipments: {
        Row: {
          carrier: string
          created_at: string | null
          id: string
          label_url: string
          media_id: string | null
          order_id: string
          raw_response: Json | null
          service_code: string | null
          shipping_charges: Json | null
          status: string | null
          tracking_number: string
          updated_at: string | null
        }
        Insert: {
          carrier: string
          created_at?: string | null
          id?: string
          label_url: string
          media_id?: string | null
          order_id: string
          raw_response?: Json | null
          service_code?: string | null
          shipping_charges?: Json | null
          status?: string | null
          tracking_number: string
          updated_at?: string | null
        }
        Update: {
          carrier?: string
          created_at?: string | null
          id?: string
          label_url?: string
          media_id?: string | null
          order_id?: string
          raw_response?: Json | null
          service_code?: string | null
          shipping_charges?: Json | null
          status?: string | null
          tracking_number?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shipments_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipments_media_id_fkey1"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      short_urls: {
        Row: {
          created_at: string
          destination_url: string | null
          id: string
          key: string | null
        }
        Insert: {
          created_at?: string
          destination_url?: string | null
          id?: string
          key?: string | null
        }
        Update: {
          created_at?: string
          destination_url?: string | null
          id?: string
          key?: string | null
        }
        Relationships: []
      }
      storefronts: {
        Row: {
          conversion_factor: number | null
          country_code: string | null
          currency_code: string | null
          currency_symbol: string | null
          decimal_separator: string | null
          domain: string
          email: string | null
          id: string
          locale: string
          measurement_system: string | null
          symbol_position: string | null
        }
        Insert: {
          conversion_factor?: number | null
          country_code?: string | null
          currency_code?: string | null
          currency_symbol?: string | null
          decimal_separator?: string | null
          domain: string
          email?: string | null
          id?: string
          locale: string
          measurement_system?: string | null
          symbol_position?: string | null
        }
        Update: {
          conversion_factor?: number | null
          country_code?: string | null
          currency_code?: string | null
          currency_symbol?: string | null
          decimal_separator?: string | null
          domain?: string
          email?: string | null
          id?: string
          locale?: string
          measurement_system?: string | null
          symbol_position?: string | null
        }
        Relationships: []
      }
      table_logs: {
        Row: {
          changes: Json | null
          created_at: string
          id: string
          new_record: Json | null
          old_record: Json | null
          record_id: string
          schema: string
          table: string
        }
        Insert: {
          changes?: Json | null
          created_at?: string
          id?: string
          new_record?: Json | null
          old_record?: Json | null
          record_id: string
          schema: string
          table: string
        }
        Update: {
          changes?: Json | null
          created_at?: string
          id?: string
          new_record?: Json | null
          old_record?: Json | null
          record_id?: string
          schema?: string
          table?: string
        }
        Relationships: []
      }
      task_comments: {
        Row: {
          created_at: string
          id: string
          task_id: string
          text: string | null
          type: Database["public"]["Enums"]["task_comment_types"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          task_id: string
          text?: string | null
          type: Database["public"]["Enums"]["task_comment_types"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          task_id?: string
          text?: string | null
          type?: Database["public"]["Enums"]["task_comment_types"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_comments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          created_at: string
          description: string | null
          id: string
          item_id: string | null
          lock_timeout: string | null
          locked: boolean
          locked_at: string
          locked_by: string | null
          locked_until: string
          order_id: string | null
          priority: number
          status: Database["public"]["Enums"]["task_statuses"] | null
          type: Database["public"]["Enums"]["task_types"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          item_id?: string | null
          lock_timeout?: string | null
          locked?: boolean
          locked_at?: string
          locked_by?: string | null
          locked_until?: string
          order_id?: string | null
          priority?: number
          status?: Database["public"]["Enums"]["task_statuses"] | null
          type: Database["public"]["Enums"]["task_types"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          item_id?: string | null
          lock_timeout?: string | null
          locked?: boolean
          locked_at?: string
          locked_by?: string | null
          locked_until?: string
          order_id?: string | null
          priority?: number
          status?: Database["public"]["Enums"]["task_statuses"] | null
          type?: Database["public"]["Enums"]["task_types"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_locked_by_fkey"
            columns: ["locked_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_locked_for_fkey1"
            columns: ["locked_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profile_roles: {
        Row: {
          user_id: string
          user_role: string
        }
        Insert: {
          user_id: string
          user_role: string
        }
        Update: {
          user_id?: string
          user_role?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profile_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_profile_roles_user_role_fkey"
            columns: ["user_role"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string
          email: string | null
          gender: string | null
          id: string
          key: string | null
          last_active: string | null
          name: string | null
          phone: string | null
          picture: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          gender?: string | null
          id: string
          key?: string | null
          last_active?: string | null
          name?: string | null
          phone?: string | null
          picture?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          gender?: string | null
          id?: string
          key?: string | null
          last_active?: string | null
          name?: string | null
          phone?: string | null
          picture?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          title: string
        }
        Insert: {
          id?: string
          title: string
        }
        Update: {
          id?: string
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_roles: {
        Args: {
          puid: string
        }
        Returns: string[]
      }
      lock_task: {
        Args: {
          task_id: string
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      call_statuses:
        | "queued"
        | "ringing"
        | "in-progress"
        | "completed"
        | "busy"
        | "failed"
        | "no-answer"
        | "canceled"
      enum_order_status:
        | "placed"
        | "edit_pending"
        | "preview_pending"
        | "ready_to_print"
        | "printed"
        | "oven"
        | "shipped"
        | "delivered"
        | "awaiting_feedback"
      order_activity_types: "positive" | "monitor" | "critical"
      order_status_names:
        | "placed"
        | "editing"
        | "feedback"
        | "approved"
        | "printed"
        | "sorted"
        | "shipped"
        | "delivered"
      payment_status:
        | "pending"
        | "failed"
        | "paid"
        | "refunded"
        | "partial_refund"
      request_methods: "POST" | "GET"
      task_comment_types: "accepted" | "refused" | "canceled" | "seen"
      task_statuses: "pending" | "in_progress" | "uploading" | "complete"
      task_types: "edit" | "print"
      user_task_interaction_types: "accepted" | "refused" | "shown" | "canceled"
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
