import { Supabase } from "./database";

export const getOrderById = async (supabase: Supabase, orderId: string) => {
  console.log("getting order by Id...");
  return await supabase
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
            user: user_profiles(*)
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
};

export const getAllUndeliveredOrders = async (supabase: Supabase) => {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `*,
        status: order_statuses(*),
        items: order_items(
          *,
          configuration: item_configurations(
            *,
            main_media: media!item_configurations_main_media_id_fkey(*),
            bg_media: media!item_configurations_bg_media_id_fkey(*)
          ),
          assets: item_assets(
            *,
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
