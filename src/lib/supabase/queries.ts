import { Supabase } from "./database";

export const getOrderById = async (supabase: Supabase, orderId: string) => {
  console.log("getting order by Id...");
  // @ts-ignore
  const { data } = await supabase
    .from("orders")
    .select(
      `*,
        shipments: shipments(*, media: media!shipments_media_id_fkey(*)),
        billing_address: addresses!orders_billing_address_id_fkey(*),
        shipping_address: addresses!orders_shipping_address_id_fkey(*),
        totals: order_totals(*),
        payment: order_payments(*),
        status: order_statuses(*),
        session: sessions(*, gclids: session_gclids(*)),
        activities: order_comments(*, user: user_profiles(*)),
        items: order_items(*,
          tasks(*),
          totals: order_item_totals(*),
          assets: item_assets(*,
            psd: media!item_assets_psd_id_fkey(*),
            thumbnail: media!item_assets_thumbnail_id_fkey(*),
            user: user_profiles(*),
            print: print_item_assets(*)
          ),
          product: products(*,
            images:product_images(url)
          ),
          configuration: item_configurations(*,
            size: product_sizes(*),
            main_media: media!item_configurations_main_media_id_fkey(*),
            bg_media: media!item_configurations_bg_media_id_fkey(*)
          )
        )`
    )
    .eq("id", orderId)
    .limit(1, { referencedTable: "order_items.order_item_totals" })
    .single();

  return { data, error: null };
};

export const getAllUndeliveredOrders = async (supabase: Supabase) => {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `*,
        status: order_statuses(*),
        items: order_items(*,
          configuration: item_configurations(*,
            main_media: media!item_configurations_main_media_id_fkey(*),
            bg_media: media!item_configurations_bg_media_id_fkey(*)
          ),
          assets: item_assets(*,
            attachments: item_asset_attachments(*, media: media(*)),
            psd: media!item_assets_psd_id_fkey(*),
            thumbnail: media!item_assets_thumbnail_id_fkey(*)
          )
        )`
    )
    .neq("order_statuses.name", "delivered")
    .order("created_at", { ascending: false });

  if (!data || error) {
    const msg = `Error fetching order item media", ${error.message}`;
    console.error(msg);
    throw Error(msg);
  }
  return data;
};

export const getPrintById = async (supabase: Supabase, printId: string) => {
  const { data, error } = await supabase
    .from("prints")
    .select("*")
    .eq("id", printId)
    .single();

  if (error || !data) {
    console.error("error", error);
    throw new Error(error.message);
  }

  return data;
};

export const getUserProfile = async (supabase: Supabase, userId: string) => {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*, roles:user_profile_roles(*, role: user_roles(*))")
    .eq("id", userId)
    .single();

  if (error || !data) {
    console.error("error", error);
    return null;
  }

  return { ...data, roles: data.roles.map(({ role }) => role?.title) };
};

export const getOrderSummaries = async (
  supabase: Supabase,
  params?: {
    range?: [number, number];
    search?: string;
  }
) => {
  const query = supabase.from("orders").select(
    `*,
    totals:order_totals(*),
    status:order_statuses(*),
    payment:order_payments(*),
    billing_address: addresses!orders_billing_address_id_fkey(*),
    shipping_address: addresses!orders_shipping_address_id_fkey(*)`
  );

  if (params?.range) {
    query.range(params.range[0], params.range[1]);
  }

  if (params?.search) {
    query.ilike("display_name", `%${params.search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error getting orders summaries:", error);
    throw new Error(error?.message || "Unknown error occurred");
  }

  return data;
};
