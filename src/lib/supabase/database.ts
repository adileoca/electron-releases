import { SupabaseClient } from "@supabase/supabase-js";
import { Database as DbTypes } from "./database.types";
import { QueryData } from "@supabase/supabase-js";


type QueryType<T extends (...args: any) => any> = QueryData<ReturnType<T>>;
export type DbEnums = DbTypes["public"]["Enums"];
export type DbTables = DbTypes["public"]["Tables"];
export type Supabase = SupabaseClient<DbTypes>;

class Database {
   supabase: Supabase;

  constructor(supabase: SupabaseClient<DbTypes>) {
    this.supabase = supabase;
    this.get = new QueryManager(this.supabase);
    this.insert = new InsertManager(this.supabase);
  }

  get: QueryManager;
  insert: InsertManager;
}

class QueryManager {
   supabase: SupabaseClient<DbTypes>;

  constructor(supabase: SupabaseClient<DbTypes>) {
    this.supabase = supabase;
  }

  emailLabels = {
    byName: async (name: string) => {
      return this.supabase
        .from("email_labels")
        .select("*")
        .eq("name", name)
        .single();
    },
    all: async () => {
      return this.supabase.from("email_labels").select("*");
    },
  };

  serviceAccount = {
    byName: async (params: { name: string; provider: string }) => {
      return await this.supabase
        .from("service_accounts")
        .select("*")
        .eq("name", params.name)
        .eq("provider", params.provider)
        .single();
    },
  };

  email = {
    byAddress: async (address: string) => {
      return await this.supabase
        .from("emails")
        .select("*")
        .eq("address", address)
        .single();
    },
  };

  emailMessage = {
    ids: {
      all: async () => {
        return await this.supabase.from("email_messages").select("id");
      },
    },
    exists: {
      byId: async (id: string) => {
        const { data, error } = await this.supabase
          .from("email_messages")
          .select("*")
          .eq("id", id)
          .single();

        return !!data && !error;
      },
    },
  };

  emailThread = {
    byId: async (id: string) => {
      return await this.supabase
        .from("email_threads")
        .select("*")
        .eq("id", id)
        .single();
    },
    ids: {
      all: async () => {
        return await this.supabase.from("email_threads").select("id");
      },
    },
    exists: {
      byId: async (id: string) => {
        const { data, error } = await this.supabase
          .from("email_threads")
          .select("*")
          .eq("id", id)
          .single();

        return !!data && !error;
      },
    },
  };

  product = {
    backgrounds: {
      all: async () => {
        return await this.supabase.from("product_backgrounds").select();
      },
    },
    slugs: {
      byCountryCode: async (countryCode: string) => {
        return await this.supabase
          .from("product_slugs")
          .select(`name, countries(iso_code)`)
          .eq("countries.iso_code", countryCode);
      },
    },
    display: {
      all: async () => {
        return await this.supabase
          .from("products")
          .select(
            "id, name, prices:product_prices(amount), images:product_images(url)"
          )
          .limit(1, { referencedTable: "prices" })
          .limit(1);
      },
    },
    detailed: {
      bySlug: async (slug: string) => {
        return await this.supabase
          .from("products")
          .select(
            `name, id,
          images:product_images(*),
          prices:product_prices(amount, size_id),
          sizes:product_sizes(id, height_cm, height_in, width_cm, width_in),
          slug:product_slugs!inner(name)`
          )
          .limit(1, { referencedTable: "product_slugs" })
          .order("amount", {
            referencedTable: "product_prices",
            ascending: true,
          })
          .order("width_cm", {
            referencedTable: "product_sizes",
            ascending: true,
          })
          .eq("product_slugs.name", slug);
      },
    },
  };

  cart = {
    items: {
      byCartId: async (cartId: string, count: boolean = false) => {
        return await this.supabase
          .from("cart_items")
          .select(
            `*, product:products(name, slug:product_slugs(name)),
              configuration:item_configurations(*,
                size:product_sizes(
                width_cm, height_cm, width_in, height_in
              )
            )`,
            {
              count: count ? "exact" : undefined,
              head: false,
            }
          )
          .limit(1, { referencedTable: "configuration.product_sizes" })
          .limit(1, { referencedTable: "item_configurations" })
          .eq("cart_id", cartId); // Use the foreign key cart_id from cart_items
      },
    },
    item: {
      byId: async (id: string) => {
        return await this.supabase
          .from("cart_items")
          .select(`*, configuration:item_configurations(*)`)
          .eq("id", id)
          .limit(1, { referencedTable: "configuration" })
          .single();
      },
    },
  };

  order = {
    summary: {
      _select: `*,
      totals:order_totals(*),
      payment:order_payments(*),
      status:order_statuses(*),
      payment:order_payments(*),
      billing_address: addresses!orders_billing_address_id_fkey(*),
      shipping_address: addresses!orders_shipping_address_id_fkey(*)`,
      byUserId: async (userId: string) => {
        return await this.supabase
          .from("orders")
          .select(
            `*,
            totals:order_totals(*),
            status:order_statuses(*),
            payment:order_payments(*),
            billing_address: addresses!orders_billing_address_id_fkey(*),
            shipping_address: addresses!orders_shipping_address_id_fkey(*)`
          )
          .eq("user_id", userId);
      },
      all: async () => {
        return await this.supabase.from("orders").select(
          `*,
          totals:order_totals(*),
          status:order_statuses(*),
          payment:order_payments(*),
          billing_address: addresses!orders_billing_address_id_fkey(*),
          shipping_address: addresses!orders_shipping_address_id_fkey(*)`
        );
      },
    },
    detailed: {
      byId: async (orderId: string) => {
        return await this.supabase
          .from("orders")
          .select(
            `*,
              billing_address: addresses!orders_billing_address_id_fkey(*),
              shipping_address: addresses!orders_shipping_address_id_fkey(*),
              totals: order_totals(*),
              payment: order_payments(*),
              status: order_statuses(*),
              activities: order_activities(*, user: user_profiles(*)),
              items: order_items(*,
                totals: order_item_totals(*),
                product: products(*),
                configuration: item_configurations(*,
                  size: product_sizes(*)
                )
              )`
          )
          .eq("id", orderId)
          .limit(1, { referencedTable: "order_items.order_item_totals" })
          .limit(1, { referencedTable: "order_activities.user_profiles" })
          .single();
      },
    },
  };
}

export type OrderDetailedType = QueryType<
  QueryManager["order"]["detailed"]["byId"]
>;

export type OrderItemType = QueryType<
  QueryManager["order"]["detailed"]["byId"]
>["items"][0];

export type ProductsDisplayType = QueryType<
  QueryManager["product"]["display"]["all"]
>;

export type ProductSlugsType = QueryType<
  QueryManager["product"]["slugs"]["byCountryCode"]
>[0];

export type ConfigurableProduct = QueryType<
  QueryManager["product"]["detailed"]["bySlug"]
>[0] & {
  backgrounds: QueryType<QueryManager["product"]["backgrounds"]["all"]>;
  price?: number | null;
  cartItemId?: string | null;
};

export type CartItemsType = QueryType<
  QueryManager["cart"]["items"]["byCartId"]
>;

export type CartItemType = QueryType<QueryManager["cart"]["item"]["byId"]>;

export type OrdersSummaryType = QueryType<
  QueryManager["order"]["summary"]["all"]
>;

class InsertManager {
   supabase: SupabaseClient<DbTypes>;

  constructor(supabase: SupabaseClient<DbTypes>) {
    this.supabase = supabase;
  }

  async emailMessagesLabels(
    insert: DbTables["email_messages_labels"]["Insert"]
  ) {
    const { data, error } = await this.supabase
      .from("email_messages_labels")
      .insert(insert)
      .select("id")
      .single();

    if (error || !data) {
      console.error("Error inserting email messages label:", error);
      throw new Error(error.message || "Unknown error occurred");
    }

    return data.id;
  }

  async emailLabel(insert: DbTables["email_labels"]["Insert"]) {
    const { data, error } = await this.supabase
      .from("email_labels")
      .insert(insert)
      .select("id")
      .single();

    if (error || !data) {
      throw new ErrorCode({
        message: error.message || "Unknown error occurred",
        code: error.code,
      });
    }

    return data.id;
  }

  async emailThread(insert: DbTables["email_threads"]["Insert"]) {
    const { data, error } = await this.supabase
      .from("email_threads")
      .insert(insert)
      .select("id")
      .single();

    if (error || !data) {
      throw new ErrorCode({
        message: error.message || "Unknown error occurred",
        code: error.code,
      });
    }

    return data.id;
  }

  async emailMessages(insert: DbTables["email_messages"]["Insert"][]) {
    const { data, error } = await this.supabase
      .from("email_messages")
      .insert(insert)
      .select("id");

    if (error || !data) {
      throw new ErrorCode({
        message: error.message || "Unknown error occurred",
        code: error.code,
      });
    }

    return data.map((d) => d.id);
  }

  async emailMessage(insert: DbTables["email_messages"]["Insert"]) {
    const { data, error } = await this.supabase
      .from("email_messages")
      .insert(insert)
      .select("id")
      .single();

    if (error || !data) {
      throw new ErrorCode({
        message: error.message || "Unknown error occurred",
        code: error.code,
      });
    }

    return data.id;
  }

  async email(insert: DbTables["emails"]["Insert"]) {
    const { data, error } = await this.supabase
      .from("emails")
      .insert(insert)
      .select("id")
      .single();

    if (error || !data) {
      console.error("Error inserting email:", error);
      throw new Error(error.message || "Unknown error occurred");
    }

    return data.id;
  }

  async itemConfiguration(insert: DbTables["item_configurations"]["Insert"]) {
    const { data, error } = await this.supabase
      .from("item_configurations")
      .insert(insert)
      .select("id")
      .single();

    if (error || !data) {
      console.error("Error inserting item configuration:", error);
      throw new Error(error.message || "Unknown error occurred");
    }

    return data.id;
  }

  async cartItem(insert: DbTables["cart_items"]["Insert"]) {
    const { data, error } = await this.supabase
      .from("cart_items")
      .insert(insert)
      .select("id")
      .single();

    if (error || !data) {
      console.error("Error inserting cart item:", error);
      throw new Error(error.message || "Unknown error occurred");
    }

    return data.id;
  }

  async cart(userId: string | undefined = undefined) {
    const { data, error } = await this.supabase
      .from("carts")
      .insert({ user_id: userId || null })
      .select("id")
      .single();

    if (error || !data) {
      console.error("Error inserting cart:", error);
      throw new Error(error.message || "Unknown error occurred");
    }

    return data.id;
  }

  async orderItem(insert: DbTables["order_items"]["Insert"]) {
    const { data, error } = await this.supabase
      .from("order_items")
      .insert(insert)
      .select("id")
      .single();

    if (error || !data) {
      console.error("Error inserting order item:", error);
      throw new Error(error.message || "Unknown error occurred");
    }

    return data.id;
  }

  async orderItemTotals(insert: DbTables["order_item_totals"]["Insert"]) {
    const { data, error } = await this.supabase
      .from("order_item_totals")
      .insert(insert)
      .select("id")
      .single();

    if (error || !data) {
      console.error("Error inserting order item totals:", error);
      throw new Error(error.message || "Unknown error occurred");
    }

    return data.id;
  }

  async address(insert: DbTables["addresses"]["Insert"]) {
    const { data, error } = await this.supabase
      .from("addresses")
      .insert(insert)
      .select("id")
      .single();

    if (error || !data) {
      console.error("Error inserting address:", error);
      throw new Error(error.message || "Unknown error occurred");
    }

    return data.id;
  }

  async order(insert: DbTables["orders"]["Insert"]) {
    const { data, error } = await this.supabase
      .from("orders")
      .insert(insert)
      .select("id")
      .single();

    if (error || !data) {
      console.error("Error inserting order:", error);
      throw new Error(error.message || "Unknown error occurred");
    }

    return data.id;
  }

  async orderPayment(insert: DbTables["order_payments"]["Insert"]) {
    const { data, error } = await this.supabase
      .from("order_payments")
      .insert(insert)
      .select("id")
      .single();

    if (error || !data) {
      console.error("Error inserting order payment:", error);
      throw new Error(error.message || "Unknown error occurred");
    }

    return data.id;
  }

  async orderStatus(insert: DbTables["order_statuses"]["Insert"]) {
    const { data, error } = await this.supabase
      .from("order_statuses")
      .insert(insert)
      .select("id")
      .single();

    if (error || !data) {
      console.error("Error inserting order status:", error);
      throw new Error(error.message || "Unknown error occurred");
    }

    return data.id;
  }

  async orderTotals(insert: DbTables["order_totals"]["Insert"]) {
    const { data, error } = await this.supabase
      .from("order_totals")
      .insert(insert)
      .select("id")
      .single();

    if (error || !data) {
      console.error("Error inserting order totals:", error);
      throw new Error(error.message || "Unknown error occurred");
    }

    return data.id;
  }

  async userMetadata(userId: string, newMetadata: object) {
    const { error } = await this.supabase.auth.admin.updateUserById(userId, {
      user_metadata: newMetadata,
    });

    if (error) {
      console.error("Error updatinsg user metadata:", error.message);
      throw new Error(error.message);
    }

    console.log("User metadata updated successfully");
  }
}

export default Database;

class ErrorCode extends Error {
  code: string;

  constructor(params: { message: string; code: string }) {
    super(params.message);
    this.name = 'ErrorCode:';
    this.code = params.code;
  }
}


// import { SupabaseClient } from '@supabase/supabase-js';
// import { Database as DbTypes } from './database.types';
// import { QueryData } from '@supabase/supabase-js';

// type QueryType<T extends (...args: any) => any> = QueryData<ReturnType<T>>;
// type DbTables = DbTypes['public']['Tables'];
// export type Supabase = SupabaseClient<DbTypes>;

// class Database {
//   private supabase: Supabase;

//   constructor(supabase: SupabaseClient<DbTypes>) {
//     this.supabase = supabase;
//     this.get = new QueryManager(this.supabase);
//     this.insert = new InsertManager(this.supabase);
//   }

//   get: QueryManager;
//   insert: InsertManager;
// }

// class QueryManager {
//   private supabase: SupabaseClient<DbTypes>;

//   constructor(supabase: SupabaseClient<DbTypes>) {
//     this.supabase = supabase;
//   }

//   product = {
//     backgrounds: {
//       all: async () => {
//         return await this.supabase.from('product_backgrounds').select();
//       },
//     },
//     slugs: {
//       byCountryCode: async (countryCode: string) => {
//         return await this.supabase
//           .from('product_slugs')
//           .select(`name, countries(iso_code)`)
//           .eq('countries.iso_code', countryCode);
//       },
//     },
//     display: {
//       all: async () => {
//         return await this.supabase
//           .from('products')
//           .select(
//             'id, name, prices:product_prices(amount), images:product_images(url)'
//           )
//           .limit(1, { referencedTable: 'prices' })
//           .limit(1);
//       },
//     },
//     detailed: {
//       bySlug: async (slug: string) => {
//         return await this.supabase
//           .from('products')
//           .select(
//             `name, id,
//           images:product_images(*),
//           prices:product_prices(amount, size_id),
//           sizes:product_sizes(id, height_cm, height_in, width_cm, width_in),
//           slug:product_slugs!inner(name)`
//           )
//           .limit(1, { referencedTable: 'product_slugs' })
//           .order('amount', {
//             referencedTable: 'product_prices',
//             ascending: true,
//           })
//           .order('width_cm', {
//             referencedTable: 'product_sizes',
//             ascending: true,
//           })
//           .eq('product_slugs.name', slug);
//       },
//     },
//   };

//   cart = {
//     items: {
//       byCartId: async (cartId: string, count: boolean = false) => {
//         return await this.supabase
//           .from('cart_items')
//           .select(
//             `*, product:products(name, slug:product_slugs(name)),
//               configuration:item_configurations(*,
//                 size:product_sizes(
//                 width_cm, height_cm, width_in, height_in
//               )
//             )`,
//             {
//               count: count ? 'exact' : undefined,
//               head: false,
//             }
//           )
//           .limit(1, { referencedTable: 'configuration.product_sizes' })
//           .limit(1, { referencedTable: 'item_configurations' })
//           .eq('cart_id', cartId); // Use the foreign key cart_id from cart_items
//       },
//     },
//     item: {
//       byId: async (id: string) => {
//         return await this.supabase
//           .from('cart_items')
//           .select(`*, configuration:item_configurations(*)`)
//           .eq('id', id)
//           .limit(1, { referencedTable: 'configuration' })
//           .single();
//       },
//     },
//   };

//   order = {
//     summary: {
//       byUserId: async (userId: string) => {
//         return await this.supabase
//           .from('orders')
//           .select('*, totals:order_totals(*), payment:order_payments(*)')
//           .eq('user_id', userId);
//       },
//       all: async () => {
//         return await this.supabase
//           .from('orders')
//           .select('*, totals:order_totals(*), payment:order_payments(*)');
//       },
//     },
//     detailed: {
//       byId: async (orderId: string) => {
//         return await this.supabase
//           .from('orders')
//           .select(
//             `*,
//               billing_address: addresses!orders_billing_address_id_fkey(*),
//               shipping_address: addresses!orders_shipping_address_id_fkey(*),
//               totals: order_totals(*),
//               payment: order_payments(*),
//               status: order_statuses(*),
//               items: order_items(*,
//                 totals: order_item_totals(*),
//                 product: products(*),
//                 configuration: item_configurations(*,
//                   size: product_sizes(*)
//                 )
//               )`
//           )
//           .eq('id', orderId)
//           .limit(1, { referencedTable: 'order_items.order_item_totals' })
//           .single();
//       },
//     },
//   };
// }

// export type OrderDetailedType = QueryType<
//   QueryManager['order']['detailed']['byId']
// >;

// export type ProductsDisplayType = QueryType<
//   QueryManager['product']['display']['all']
// >;

// export type ProductSlugsType = QueryType<
//   QueryManager['product']['slugs']['byCountryCode']
// >[0];

// export type ConfigurableProduct = QueryType<
//   QueryManager['product']['detailed']['bySlug']
// >[0] & {
//   backgrounds: QueryType<QueryManager['product']['backgrounds']['all']>;
//   price?: number | null;
//   cartItemId?: string | null;
// };

// export type CartItemsType = QueryType<
//   QueryManager['cart']['items']['byCartId']
// >;

// export type CartItemType = QueryType<QueryManager['cart']['item']['byId']>;

// export type OrdersSummaryType = QueryType<
//   QueryManager['order']['summary']['all']
// >;

// class InsertManager {
//   private supabase: SupabaseClient<DbTypes>;

//   constructor(supabase: SupabaseClient<DbTypes>) {
//     this.supabase = supabase;
//   }

//   async itemConfiguration(insert: DbTables['item_configurations']['Insert']) {
//     const { data, error } = await this.supabase
//       .from('item_configurations')
//       .insert(insert)
//       .select('id')
//       .single();

//     if (error || !data) {
//       console.error('Error inserting item configuration:', error);
//       throw new Error(error.message || 'Unknown error occurred');
//     }

//     return data.id;
//   }

//   async cartItem(insert: DbTables['cart_items']['Insert']) {
//     const { data, error } = await this.supabase
//       .from('cart_items')
//       .insert(insert)
//       .select('id')
//       .single();

//     if (error || !data) {
//       console.error('Error inserting cart item:', error);
//       throw new Error(error.message || 'Unknown error occurred');
//     }

//     return data.id;
//   }

//   async cart(userId: string | undefined = undefined) {
//     const { data, error } = await this.supabase
//       .from('carts')
//       .insert({ user_id: userId || null })
//       .select('id')
//       .single();

//     if (error || !data) {
//       console.error('Error inserting cart:', error);
//       throw new Error(error.message || 'Unknown error occurred');
//     }

//     return data.id;
//   }

//   async orderItem(insert: DbTables['order_items']['Insert']) {
//     const { data, error } = await this.supabase
//       .from('order_items')
//       .insert(insert)
//       .select('id')
//       .single();

//     if (error || !data) {
//       console.error('Error inserting order item:', error);
//       throw new Error(error.message || 'Unknown error occurred');
//     }

//     return data.id;
//   }

//   async orderItemTotals(insert: DbTables['order_item_totals']['Insert']) {
//     const { data, error } = await this.supabase
//       .from('order_item_totals')
//       .insert(insert)
//       .select('id')
//       .single();

//     if (error || !data) {
//       console.error('Error inserting order item totals:', error);
//       throw new Error(error.message || 'Unknown error occurred');
//     }

//     return data.id;
//   }

//   async address(insert: DbTables['addresses']['Insert']) {
//     const { data, error } = await this.supabase
//       .from('addresses')
//       .insert(insert)
//       .select('id')
//       .single();

//     if (error || !data) {
//       console.error('Error inserting address:', error);
//       throw new Error(error.message || 'Unknown error occurred');
//     }

//     return data.id;
//   }

//   async order(insert: DbTables['orders']['Insert']) {
//     const { data, error } = await this.supabase
//       .from('orders')
//       .insert(insert)
//       .select('id')
//       .single();

//     if (error || !data) {
//       console.error('Error inserting order:', error);
//       throw new Error(error.message || 'Unknown error occurred');
//     }

//     return data.id;
//   }

//   async orderPayment(insert: DbTables['order_payments']['Insert']) {
//     const { data, error } = await this.supabase
//       .from('order_payments')
//       .insert(insert)
//       .select('id')
//       .single();

//     if (error || !data) {
//       console.error('Error inserting order payment:', error);
//       throw new Error(error.message || 'Unknown error occurred');
//     }

//     return data.id;
//   }

//   async orderStatus(insert: DbTables['order_statuses']['Insert']) {
//     const { data, error } = await this.supabase
//       .from('order_statuses')
//       .insert(insert)
//       .select('id')
//       .single();

//     if (error || !data) {
//       console.error('Error inserting order status:', error);
//       throw new Error(error.message || 'Unknown error occurred');
//     }

//     return data.id;
//   }

//   async orderTotals(insert: DbTables['order_totals']['Insert']) {
//     const { data, error } = await this.supabase
//       .from('order_totals')
//       .insert(insert)
//       .select('id')
//       .single();

//     if (error || !data) {
//       console.error('Error inserting order totals:', error);
//       throw new Error(error.message || 'Unknown error occurred');
//     }

//     return data.id;
//   }

//   async userMetadata(userId: string, newMetadata: object) {
//     const { error } = await this.supabase.auth.admin.updateUserById(userId, {
//       user_metadata: newMetadata,
//     });

//     if (error) {
//       console.error('Error updatinsg user metadata:', error.message);
//       throw new Error(error.message);
//     }

//     console.log('User metadata updated successfully');
//   }
// }

// export default Database;
