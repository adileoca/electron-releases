import { SupabaseClient, QueryData } from '@supabase/supabase-js';
import { Database as DbTypes } from './database.types';
import { SUPABASE_URL } from './constants';

type QueryType<T extends (...args: any) => any> = QueryData<ReturnType<T>>;
export type DbTables = DbTypes['public']['Tables'];
export type DbEnums = DbTypes['public']['Enums'];
export type Supabase = SupabaseClient<DbTypes>;

class Database {
  private supabase: Supabase;

  constructor(supabase: SupabaseClient<DbTypes>) {
    this.supabase = supabase;
    this.get = new QueryManager(this.supabase);
    this.insert = new InsertManager(this.supabase);
    this.update = new UpdateManager(this.supabase);
  }

  get: QueryManager;
  insert: InsertManager;
  update: UpdateManager;

  async getItemAssetsForPrinting() {
    const { data, error } = await this.supabase
      .from('orders')
      .select(
        `*,
        status: order_statuses(*),
        items: order_items(*, assets: item_assets(*,
            psd:media!item_assets_psd_id_fkey(*),
            thumbnail:media!item_assets_thumbnail_id_fkey(*)
          )
        )
        `
      )
      .eq('order_statuses.name', 'approved');

    if (error) {
      console.error('Error getting assets for printing:', error);
      throw new Error(error?.message || 'Unknown error occurred');
    }

    const assets = data
      .flatMap(order => order.items.flatMap(item => item.assets))
      .filter(asset => asset.approved === true);

    return assets;
  }

  async getPrintsItemAssets(eq?: { printId?: string }) {
    let query = this.supabase
      .from('print_item_assets')
      .select(`*, print: prints(*)`);

    if (eq) {
      if (eq.printId) {
        query = query.eq('print_id', eq.printId);
      }
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error getting print item assets:', error);
      throw new Error(error?.message || 'Unknown error occurred');
    }

    return data;
  }

  async insertPrintItemAsset(
    insert: DbTables['print_item_assets']['Insert'],
    supabase: Supabase = this.supabase
  ) {
    const { data, error } = await supabase
      .from('print_item_assets')
      .insert(insert);

    if (error) {
      console.error('Error inserting print item asset:', error);
      throw new Error(error?.message || 'Unknown error occurred');
    }
  }

  async removePrintItemAsset(
    printId: string,
    itemAssetId: string,
    supabase: Supabase = this.supabase
  ) {
    const { error } = await supabase
      .from('print_item_assets')
      .delete()
      .eq('print_id', printId)
      .eq('item_asset_id', itemAssetId);

    if (error) {
      console.error('Error inserting print item asset:', error);
      throw new Error(error?.message || 'Unknown error occurred');
    }
  }

  async insertPrint(
    insert: DbTables['prints']['Insert'],
    supabase: Supabase = this.supabase
  ) {
    const { data, error } = await supabase
      .from('prints')
      .insert(insert)
      .select('*')
      .single();

    if (error || !data) {
      console.error('Error inserting print:', error);
      throw new Error(error?.message || 'Unknown error occurred');
    }

    return data;
  }

  async getPrints(supabase: Supabase = this.supabase) {
    const { data, error } = await supabase.from('prints').select(
      `*,
        psd:media!prints_psd_id_fkey(*),
        thumbnail:media!prints_thumbnail_id_fkey(*)
        `
    );

    if (error || !data) {
      console.error('Error getting prints:', error);
      throw new Error(error?.message || 'Unknown error occurred');
    }

    return data;
  }

  async updatePrint(id: string, update: DbTables['prints']['Update']) {
    const { error } = await this.supabase
      .from('prints')
      .update(update)
      .eq('id', id);

    if (error) {
      console.error('Error updating print:', error);
      throw new Error(error?.message || 'Unknown error occurred');
    }
  }

  async insertMediaMetadata(
    insert: DbTables['media_metadata']['Insert'],
    supabase: Supabase = this.supabase
  ) {
    const { data, error } = await supabase
      .from('media_metadata')
      .insert(insert)
      .select('*')
      .single();

    if (error || !data) {
      console.error('Error inserting media metadata:', error);
      throw new Error(error?.message || 'Unknown error occurred');
    }

    return data;
  }

  // todo: have item_id as the primary key for item assets
  async updateItemAssets(
    id: string,
    update: DbTables['item_assets']['Update']
  ) {
    const { data, error } = await this.supabase
      .from('item_assets')
      .update(update)
      .eq('id', id)
      .select('*')
      .single();

    if (error || !data) {
      console.error('Error updating item media assets:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data;
  }

  updateOrder = async (
    id: string,
    update: DbTables['orders']['Update'],
    supabase: Supabase = this.supabase
  ) => {
    const { data, error } = await supabase
      .from('orders')
      .update(update)
      .eq('id', id);

    if (error || !data) {
      console.error('Error updating order:', error);
      return { error };
    }

    return { error: null };
  };

  async getOrderIdByCheckoutId(id: string, supabase: Supabase = this.supabase) {
    const { data, error } = await supabase
      .from('orders')
      .select('id')
      .eq('stripe_checkout_id', id)
      .single();

    if (error || !data) {
      console.error('Error getting order id by checkout id:', error);
      throw new Error(error?.message || 'Unknown error occurred');
    }

    return data.id;
  }

  async getPrintTemplates(supabase: Supabase = this.supabase) {
    const { data, error } = await supabase.from('print_templates').select(
      ` *,
        psd: media!print_templates_media_id_fkey(*),
        thumbnail: media!print_templates_thumbnail_id_fkey(*)
      `
    );

    if (error || !data) {
      console.error('Error getting print templates:', error);
      throw new Error(error?.message || 'Unknown error occurred');
    }

    return data;
  }

  async insertPrintTemplate(
    insert: DbTables['print_templates']['Insert'],
    supabase: Supabase = this.supabase
  ) {
    const { data, error } = await supabase
      .from('print_templates')
      .insert(insert)
      .select('*');

    if (error || !data) {
      console.error('Error inserting print template:', error);
      throw new Error(error?.message || 'Unknown error occurred');
    }

    return data;
  }

  async getOrderData(id: string, supabase: Supabase = this.supabase) {
    const { data, error } = await supabase
      .from('orders')
      .select(
        `*,
        billing_address: addresses!orders_billing_address_id_fkey(*),
        shipping_address: addresses!orders_shipping_address_id_fkey(*),
        totals: order_totals(*),
        payment: order_payments(*),
        status: order_statuses(*),
        activities: order_activities(*, user: user_profiles(*)),
        storefront: storefronts(*),
        tokens: order_tokens(*),
        items: order_items(*,
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
      .eq('id', id)
      .limit(1, { referencedTable: 'order_items.order_item_totals' })
      .single();

    if (error || !data) {
      console.error('Error getting order data:', error);
      throw new Error(error?.message || 'Unknown error occurred');
    }

    return data;
  }

  async getOrderPreviews(id: string, supabase: Supabase = this.supabase) {
    const { data, error } = await supabase
      .from('orders')
      .select(
        `*,
        items: order_items(*,
          product: products(*),
          assets: item_assets(*,
            thumbnail: media!item_assets_thumbnail_id_fkey(*)
          ),
          configuration: item_configurations(*, size: product_sizes(*))
        )`
      )
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error('Error getting order previews:', error);
      throw new Error(error?.message || 'Unknown error occurred');
    }

    return { data };
  }

  async getOrderTokens(
    {
      orderId,
      checkoutId,
      key,
    }: { orderId?: string; checkoutId?: string; key?: String },
    supabase: Supabase = this.supabase
  ) {
    let query = supabase
      .from('order_tokens')
      .select('*, order: orders(id, stripe_checkout_id)');

    if (orderId) {
      query = query.eq('order_id', orderId);
    }

    if (checkoutId) {
      query = query.eq('orders.stripe_checkout_id', checkoutId);
    }

    if (key) {
      query = query.eq('key', key);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error getting order token:', error);
      throw new Error(error?.message || 'Unknown error occurred');
    }

    return data;
  }

  updateOrderToken = async (
    id: number,
    update: DbTables['order_tokens']['Update'],
    supabase: Supabase = this.supabase
  ) => {
    const { error } = await supabase
      .from('order_tokens')
      .update(update)
      .eq('id', id);

    if (error) {
      console.error('Error updating order token:', error);
    }

    return error;
  };

  updateOrderStatus = async (
    id: string,
    update: DbTables['order_statuses']['Update'],
    supabase: Supabase = this.supabase
  ) => {
    const { error } = await supabase
      .from('order_statuses')
      .update(update)
      .eq('id', id);

    if (error) {
      console.error('Error updating order status:', error);
      throw new Error(error?.message || 'Unknown error occurred');
    }
  };

  insertOrderToken = async (
    insert: DbTables['order_tokens']['Insert'],
    supabase: Supabase = this.supabase
  ) => {
    const { error } = await supabase.from('order_tokens').insert(insert);

    if (error) {
      console.error('Error inserting order token:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }
  };

  insertTasks = async (
    insert: DbTables['tasks']['Insert'] | DbTables['tasks']['Insert'][],
    supabase: Supabase = this.supabase
  ) => {
    const insertIsArray = Array.isArray(insert);

    const { data, error } = await supabase
      .from('tasks')
      .insert(insertIsArray ? insert : [insert])
      .select('id');

    if (error || !data) {
      console.error('Error inserting task:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return { data, error };
  };

  getTasksByOrder = async (
    orderId: string,
    supabase: Supabase = this.supabase
  ) => {
    const { data, error } = await supabase
      .from('orders')
      .select('*, storefront: storefronts(*), items: order_items(*, tasks(*))')
      .eq('id', orderId)
      .single();

    if (error) {
      console.error('Error getting tasks by order:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    const tasks = data?.items?.map(item => item.tasks).flat();
    return { data: { tasks, order: data }, error: null };
  };

  async insertRequestLogs(
    insert: DbTables['request_logs']['Insert'],
    supabase: Supabase = this.supabase
  ) {
    const insertIsArray = Array.isArray(insert);

    const { data, error } = await supabase
      .from('request_logs')
      .insert(insertIsArray ? insert : [insert])
      .select('id');

    if (error) {
      throw new Error(error.message || 'Unknown error occurred');
    }

    return { data };
  }
  uploadScheduledMedia = async (params: {
    media: DbTables['media']['Row'];
    file: Blob;
  }) => {
    try {
      await this.update.mediaData(params.media.id, {
        upload_start: new Date().toISOString(),
        uploading: true,
      });

      await this.supabase.storage
        .from(params.media.bucket_name)
        .upload(params.media.path!, params.file)
        .catch(err => {
          // log error to db
          throw new Error(err.message || 'Unknown error occurred');
        });

      await this.update.mediaData(params.media.id, {
        upload_end: new Date().toISOString(),
        uploading: false,
        scheduled: false,
      });
    } catch (error) {
      console.error('Error uploading media', params.media.id, error);

      // todo: log error elsewhere as well

      await this.update.mediaData(params.media.id, {
        uploading: false,
        upload_start: null,
        error: (error as Error).message,
      });
    }
  };
}

class QueryManager {
  private supabase: SupabaseClient<DbTypes>;

  constructor(supabase: SupabaseClient<DbTypes>) {
    this.supabase = supabase;
  }

  emailLabels = {
    byName: async (name: string) => {
      return this.supabase
        .from('email_labels')
        .select('*')
        .eq('name', name)
        .single();
    },
    all: async () => {
      return this.supabase.from('email_labels').select('*');
    },
  };
  scheduledUploadGroups = {
    pending: async () => {
      return this.supabase
        .from('scheduled_uploads_group')
        .select('*, uploads: media(*)')
        .is('uploaded_at', null);
    },
  };

  media = {
    data: async (select?: {
      where?: { taskId?: string; isScheduled?: boolean };
    }) => {
      let query = this.supabase
        .from('media')
        .select('*, group:scheduled_uploads_group(*)');

      if (!select?.where) {
        return await query;
      }

      if (select.where.taskId) {
        query = query.eq(
          'scheduled_uploads_group.task_id',
          select.where.taskId
        );
      }

      if (select.where.isScheduled) {
        query = query.eq('scheduled', select.where.isScheduled);
      }

      return await query;
    },
    file: async (args: { bucketName: string; path: string }) => {
      const { data, error } = await this.supabase.storage
        .from(args.bucketName)
        .download(args.path!);

      if (data) {
        return data;
      }

      if (error) {
        console.log(
          `error downloading  from ${args.bucketName}, path ${args.path}. `,
          error
        );
        return null;
      }
    },
  };

  configuration = async (select?: { where?: { id?: string } }) => {
    let query = this.supabase.from('item_configurations').select('*');

    if (!select?.where) {
      return await query;
    }

    if (select.where.id) {
      query = query.eq('id', select.where.id);
    }

    return await query;
  };

  //??
  orderItems = {
    all: async () => {
      return this.supabase
        .from('orders')
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
              psd: media!item_assets_psd_id_fkey(*),
              thumbnail: media!item_assets_thumbnail_id_fkey(*)
            )
          )`
        )
        .neq('order_statuses.name', 'delivered')
        .order('created_at', { ascending: false });
    },
  };

  sizeTemplates = {
    all: async () => {
      return this.supabase.from('product_sizes').select('template: media(*)');
    },
  };

  serviceAccount = {
    byName: async (params: { name: string; provider: string }) => {
      return await this.supabase
        .from('service_accounts')
        .select('*')
        .eq('name', params.name)
        .eq('provider', params.provider)
        .single();
    },
  };

  email = {
    byAddress: async (address: string) => {
      return await this.supabase
        .from('emails')
        .select('*')
        .eq('address', address)
        .single();
    },
  };

  orderActivities = async (options?: {
    where?: {
      id?: string;
      type?: DbEnums['order_activity_types'];
      task_id?: string;
      order_id?: string;
      item_id?: string;
      user_id?: string;
    };
  }) => {
    let query = this.supabase.from('order_activities').select('*');

    if (options?.where) {
      for (const [key, value] of Object.entries(options.where)) {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      }
    }

    return await query;
  };

  userTaskInteractions = async (options?: {
    where?: { user_id?: string; task_id?: string };
  }) => {
    let query = this.supabase.from('user_task_interactions').select('*');

    if (options?.where) {
      for (const [key, value] of Object.entries(options.where)) {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      }
    }

    return await query;
  };

  tasks = {
    detailed: async (options?: {
      where?: {
        id?: string;
        status?: DbEnums['task_statuses'];
        user_id?: string;
        interactions?: {
          user_id?: string;
          type?: DbEnums['user_task_interaction_types'];
        };
      };
    }) => {
      let query = this.supabase.from('tasks').select(
        `*,
          interactions: user_task_interactions(*),
          item: order_items(*,
          product: products(*),
          assets: item_assets(*,
            psd: media!item_assets_psd_id_fkey(*),
            thumbnail: media!item_assets_thumbnail_id_fkey(*),
            user: user_profiles(*)
          ),
          configuration: item_configurations(*,
            size: product_sizes(*,template: media(*)),
            main_media: media!item_configurations_main_media_id_fkey(*),
            bg_media: media!item_configurations_bg_media_id_fkey(*)
          )
        )
        `
      );

      if (options?.where?.id) {
        query = query.eq('id', options.where.id);
      }

      if (options?.where?.status) {
        query = query.eq('status', options.where.status);
      }

      if (options?.where?.user_id) {
        query = query.eq('user_id', options.where.user_id);
      }

      if (options?.where?.interactions) {
        if (options.where.interactions.user_id) {
          query = query.eq(
            'interactions.user_id',
            options.where.interactions.user_id
          );
        }
        if (options.where.interactions.type) {
          query = query.eq(
            'interactions.type',
            options.where.interactions.type
          );
        }
      }

      return await query;
    },

    summary: async (options?: {
      where?: {
        id?: string;
        status?: DbEnums['task_statuses'];
        user_id?: string;
      };
    }) => {
      let query = this.supabase.from('tasks').select(
        `*,
          item: order_items(*,
            product: products(*),
            configuration: item_configurations(*, size: product_sizes(
              *,
              template: media(*)
            ))
          )`
      );

      if (options?.where?.id) {
        query = query.eq('id', options.where.id);
      }

      if (options?.where?.status) {
        query = query.eq('status', options.where.status);
      }

      if (options?.where?.user_id) {
        query = query.eq('user_id', options.where.user_id);
      }

      return await query;
    },
  };

  emailMessage = {
    ids: {
      all: async () => {
        return await this.supabase.from('email_messages').select('id');
      },
    },
    exists: {
      byId: async (id: string) => {
        const { data, error } = await this.supabase
          .from('email_messages')
          .select('*')
          .eq('id', id)
          .single();

        return !!data && !error;
      },
    },
  };

  emailThread = {
    byId: async (id: string) => {
      return await this.supabase
        .from('email_threads')
        .select('*')
        .eq('id', id)
        .single();
    },
    ids: {
      all: async () => {
        return await this.supabase.from('email_threads').select('id');
      },
    },
    exists: {
      byId: async (id: string) => {
        const { data, error } = await this.supabase
          .from('email_threads')
          .select('*')
          .eq('id', id)
          .single();

        return !!data && !error;
      },
    },
  };

  product = {
    backgrounds: {
      all: async () => {
        return await this.supabase.from('product_backgrounds').select();
      },
    },
    slugs: {
      byCountryCode: async (countryCode: string) => {
        return await this.supabase
          .from('product_slugs')
          .select(`name, countries(iso_code)`)
          .eq('countries.iso_code', countryCode);
      },
    },
    display: {
      all: async () => {
        return await this.supabase
          .from('products')
          .select(
            'id, name, prices:product_prices(amount), images:product_images(url)'
          )
          .limit(1, { referencedTable: 'prices' })
          .limit(1);
      },
    },
    detailed: {
      bySlug: async (slug: string) => {
        return await this.supabase
          .from('products')
          .select(
            `name, id,
          images:product_images(*),
          prices:product_prices(amount, size_id),
          sizes:product_sizes(id, height_cm, height_in, width_cm, width_in),
          slug:product_slugs!inner(name)`
          )
          .limit(1, { referencedTable: 'product_slugs' })
          .order('amount', {
            referencedTable: 'product_prices',
            ascending: true,
          })
          .order('width_cm', {
            referencedTable: 'product_sizes',
            ascending: true,
          })
          .eq('product_slugs.name', slug);
      },
    },
  };

  userProfile = async (options?: { where?: { id?: string; key?: string } }) => {
    let query = this.supabase.from('user_profiles').select('*');

    if (options?.where) {
      for (const [key, value] of Object.entries(options.where)) {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      }
    }

    return await query;
  };

  cart = {
    items: {
      byCartId: async (cartId: string, count: boolean = false) => {
        return await this.supabase
          .from('cart_items')
          .select(
            `*, product:products(name, slug:product_slugs(name)),
              configuration:item_configurations(*,
                  main_media:media!item_configurations_main_media_id_fkey(url),
                  bg_media:media!item_configurations_bg_media_id_fkey(url),
                size:product_sizes(
                width_cm, height_cm, width_in, height_in
              )
            )`,
            { count: count ? 'exact' : undefined, head: false }
          )
          .limit(1, { referencedTable: 'configuration.product_sizes' })
          .limit(1, { referencedTable: 'item_configurations' })
          .eq('cart_id', cartId); // Use the foreign key cart_id from cart_items
      },
    },

    item: {
      byId: async (id: string) => {
        return await this.supabase
          .from('cart_items')
          .select(`*, configuration:item_configurations(*)`)
          .eq('id', id)
          .limit(1, { referencedTable: 'configuration' })
          .single();
      },
    },
  };

  order = {
    summary: {
      byUserId: async (userId: string) => {
        return await this.supabase
          .from('orders')
          .select(
            `*,
            totals:order_totals(*),
            status:order_statuses(*),
            payment:order_payments(*),
            billing_address: addresses!orders_billing_address_id_fkey(*),
            shipping_address: addresses!orders_shipping_address_id_fkey(*)`
          )
          .eq('user_id', userId);
      },
      all: async () => {
        return await this.supabase.from('orders').select(
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
          .from('orders')
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
          .eq('id', orderId)
          .limit(1, { referencedTable: 'order_items.order_item_totals' })
          .single();
      },
      byCheckoutId: async (checkoutId: string) => {
        return await this.supabase
          .from('orders')
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
          .eq('stripe_checkout_id', checkoutId)
          .limit(1, { referencedTable: 'order_items.order_item_totals' })
          .single();
      },
    },
  };
}

export type PrintItemAssets = Awaited<
  ReturnType<Database['getPrintsItemAssets']>
>[0];

export type PrintTemplate = Awaited<
  ReturnType<Database['getPrintTemplates']>
>[0];

export type ItemAssetsForPrinting = Awaited<
  ReturnType<Database['getItemAssetsForPrinting']>
>[0];

export type Print = Awaited<ReturnType<Database['getPrints']>>[0];

export type OrderDataType = Awaited<ReturnType<Database['getOrderData']>>;

export type OrderPreviewsType = QueryType<Database['getOrderPreviews']>;

export type TaskDetailedType = QueryType<QueryManager['tasks']['detailed']>[0];

export type OrderDetailedType = QueryType<
  QueryManager['order']['detailed']['byId']
>;

export type TaskSummaryType = QueryType<QueryManager['tasks']['summary']>;

export type OrderItemType = QueryType<
  QueryManager['order']['detailed']['byId']
>['items'][0];

export type ProductsDisplayType = QueryType<
  QueryManager['product']['display']['all']
>;

export type ProductSlugsType = QueryType<
  QueryManager['product']['slugs']['byCountryCode']
>[0];

export type ConfigurableProduct = QueryType<
  QueryManager['product']['detailed']['bySlug']
>[0] & {
  backgrounds: QueryType<QueryManager['product']['backgrounds']['all']>;
  price?: number | null;
  cartItemId?: string | null;
};

export type CartItemsType = QueryType<
  QueryManager['cart']['items']['byCartId']
>;

export type CartItemType = QueryType<QueryManager['cart']['item']['byId']>;

export type OrdersSummaryType = QueryType<
  QueryManager['order']['summary']['all']
>;

class InsertManager {
  private supabase: SupabaseClient<DbTypes>;

  constructor(supabase: SupabaseClient<DbTypes>) {
    this.supabase = supabase;
  }

  async scheduledUploadsGroup(
    insert: DbTables['scheduled_uploads_group']['Insert']
  ) {
    const { data, error } = await this.supabase
      .from('scheduled_uploads_group')
      .insert(insert)
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error inserting scheduled:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data.id;
  }

  async orderActivities(insert: DbTables['order_activities']['Insert']) {
    const { data, error } = await this.supabase
      .from('order_activities')
      .insert(insert)
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error inserting order activities:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data.id;
  }

  async media(
    insert: DbTables['media']['Insert'],
    config: {
      content?: Blob | 'schedule';
      returnType?: 'url' | 'id';
      upsert?: boolean;
    }
  ) {
    if (config.content === 'schedule') {
      if (config.returnType === 'url') {
        throw new Error("Cannot return 'url' when 'schedule' is true");
      }

      const { data: insertData, error: insertError } = await this.supabase
        .from('media')
        .insert({ ...insert, scheduled: true }) // make sure to mark as scheduled
        .select('id')
        .single();

      if (insertError || !insertData) {
        console.error('Error inserting media into db:', insertError);
        throw new Error(insertError.message || 'Unknown error occurred');
      }

      return insertData.id;
    } else {
      const [uploadResult, insertResult] = await Promise.all([
        this.supabase.storage
          .from(insert.bucket_name)
          .upload(insert.path!, config.content!, {
            upsert: config.upsert ? config.upsert : false,
          }),
        this.supabase.from('media').insert(insert).select('id').single(),
      ]);

      const { data: uploadData, error: uploadError } = uploadResult;
      const { data: insertData, error: insertError } = insertResult;

      if (uploadError || !uploadData) {
        console.error('Error uploading media to bucket:', uploadError);
        throw new Error(uploadError.message || 'Unknown error occurred');
      }

      if (insertError || !insertData) {
        console.error('Error inserting media into db:', insertError);
        throw new Error(insertError.message || 'Unknown error occurred');
      }

      if (config?.returnType === 'url') {
        return `${SUPABASE_URL}/storage/v1/object/${insert.bucket_name}/${insert.path}`;
      }

      if (config?.returnType === 'id') {
        return insertData.id;
      }

      return insertData.id;
    }
  }

  async userTaskInteractions(
    insert: DbTables['user_task_interactions']['Insert']
  ) {
    const { data, error } = await this.supabase
      .from('user_task_interactions')
      .insert(insert)
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error inserting user task interactions:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data.id;
  }

  // todo: refactor to work with plural or singular (accept an array an return with single if only one element
  async itemMediaAssets(insert: DbTables['item_assets']['Insert']) {
    const { data, error } = await this.supabase
      .from('item_assets')
      .insert(insert)
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error inserting item media assets:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data.id;
  }

  // async scheduledUploads(insert: DbTables['scheduled_uploads']['Insert']) {
  //   const { data, error } = await this.supabase
  //     .from('scheduled_uploads')
  //     .insert(insert)
  //     .select('id')
  //     .single();

  //   if (error || !data) {
  //     console.error('Error inserting scheduled uploads:', error);
  //     throw new Error(error.message || 'Unknown error occurred');
  //   }

  //   return data.id;
  // }

  async emailMessagesLabels(
    insert: DbTables['email_messages_labels']['Insert']
  ) {
    const { data, error } = await this.supabase
      .from('email_messages_labels')
      .insert(insert)
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error inserting email messages label:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data.id;
  }

  async emailLabel(insert: DbTables['email_labels']['Insert']) {
    const { data, error } = await this.supabase
      .from('email_labels')
      .insert(insert)
      .select('id')
      .single();

    if (error || !data) {
      throw new ErrorCode({
        message: error.message || 'Unknown error occurred',
        code: error.code,
      });
    }

    return data.id;
  }

  async emailThread(insert: DbTables['email_threads']['Insert']) {
    const { data, error } = await this.supabase
      .from('email_threads')
      .insert(insert)
      .select('id')
      .single();

    if (error || !data) {
      throw new ErrorCode({
        message: error.message || 'Unknown error occurred',
        code: error.code,
      });
    }

    return data.id;
  }

  async emailMessages(insert: DbTables['email_messages']['Insert'][]) {
    const { data, error } = await this.supabase
      .from('email_messages')
      .insert(insert)
      .select('id');

    if (error || !data) {
      throw new ErrorCode({
        message: error.message || 'Unknown error occurred',
        code: error.code,
      });
    }

    return data.map(d => d.id);
  }

  async emailMessage(insert: DbTables['email_messages']['Insert']) {
    const { data, error } = await this.supabase
      .from('email_messages')
      .insert(insert)
      .select('id')
      .single();

    if (error || !data) {
      throw new ErrorCode({
        message: error.message || 'Unknown error occurred',
        code: error.code,
      });
    }

    return data.id;
  }

  async email(insert: DbTables['emails']['Insert']) {
    const { data, error } = await this.supabase
      .from('emails')
      .insert(insert)
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error inserting email:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data.id;
  }

  async itemConfiguration(insert: DbTables['item_configurations']['Insert']) {
    const { data, error } = await this.supabase
      .from('item_configurations')
      .insert(insert)
      .select('*')
      .single();

    if (error || !data) {
      console.error('Error inserting item configuration:', error);
      throw new Error(error?.message || 'Unknown error occurred');
    }

    return data;
  }

  async cartItem(insert: DbTables['cart_items']['Insert']) {
    const { data, error } = await this.supabase
      .from('cart_items')
      .insert(insert)
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error inserting cart item:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data.id;
  }

  async cart(userId: string | undefined = undefined) {
    const { data, error } = await this.supabase
      .from('carts')
      .insert({ user_id: userId || null })
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error inserting cart:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data.id;
  }

  async orderItem(insert: DbTables['order_items']['Insert']) {
    const { data, error } = await this.supabase
      .from('order_items')
      .insert(insert)
      .select('*')
      .single();

    if (error || !data) {
      console.error('Error inserting order item:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data;
  }

  async orderItemTotals(insert: DbTables['order_item_totals']['Insert']) {
    const { data, error } = await this.supabase
      .from('order_item_totals')
      .insert(insert)
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error inserting order item totals:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data.id;
  }

  async address(insert: DbTables['addresses']['Insert']) {
    const { data, error } = await this.supabase
      .from('addresses')
      .insert(insert)
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error inserting address:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data.id;
  }

  async order(insert: DbTables['orders']['Insert']) {
    const { data, error } = await this.supabase
      .from('orders')
      .insert(insert)
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error inserting order:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data.id;
  }

  async orderPayment(insert: DbTables['order_payments']['Insert']) {
    const { data, error } = await this.supabase
      .from('order_payments')
      .insert(insert)
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error inserting order payment:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data.id;
  }

  async orderStatus(insert: DbTables['order_statuses']['Insert']) {
    const { data, error } = await this.supabase
      .from('order_statuses')
      .insert(insert)
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error inserting order status:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data.id;
  }

  async orderTotals(insert: DbTables['order_totals']['Insert']) {
    const { data, error } = await this.supabase
      .from('order_totals')
      .insert(insert)
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error inserting order totals:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data.id;
  }

  async userMetadata(userId: string, newMetadata: object) {
    const { error } = await this.supabase.auth.admin.updateUserById(userId, {
      user_metadata: newMetadata,
    });

    if (error) {
      console.error('Error updatinsg user metadata:', error.message);
      throw new Error(error.message);
    }

    console.log('User metadata updated successfully');
  }
}

class UpdateManager {
  private supabase: SupabaseClient<DbTypes>;

  constructor(supabase: SupabaseClient<DbTypes>) {
    this.supabase = supabase;
  }

  orderActivities = async (
    id: string,
    update: DbTables['order_activities']['Update']
  ) => {
    const { data, error } = await this.supabase
      .from('order_activities')
      .update(update)
      .eq('id', id)
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error updating order activities:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data.id;
  };

  scheduledUploadsGroup = async (
    id: string,
    update: DbTables['scheduled_uploads_group']['Update']
  ) => {
    const { data, error } = await this.supabase
      .from('scheduled_uploads_group')
      .update(update)
      .eq('id', id)
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error updating scheduled uploads group:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data.id;
  };

  task = async (id: string, update: DbTables['tasks']['Update']) => {
    const { data, error } = await this.supabase
      .from('tasks')
      .update(update)
      .eq('id', id)
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error updating task:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data.id;
  };

  mediaData = async (id: string, update: DbTables['media']['Update']) => {
    const { data, error } = await this.supabase
      .from('media')
      .update(update)
      .eq('id', id);

    if (error) {
      console.error('Error updating media:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }
  };
}

export default Database;

export class ErrorCode extends Error {
  code: string;

  constructor(params: { message: string; code: string }) {
    super(params.message);
    this.name = 'ErrorCode:';
    this.code = params.code;
  }
}
