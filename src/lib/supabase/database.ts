import { SupabaseClient } from '@supabase/supabase-js';
import { Database as DbTypes } from './database.types';
import { QueryData } from '@supabase/supabase-js';

import { SUPABASE_URL } from './constants';

type QueryType<T extends (...args: any) => any> = QueryData<ReturnType<T>>;
export type DbEnums = DbTypes['public']['Enums'];
export type DbTables = DbTypes['public']['Tables'];
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
        .select('*, uploads: scheduled_uploads(*)')
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
      query = query.eq('task_id', select.where.id);
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
              bg_media: media!item_configurations_bg_media_id_fkey(*),
              thumbnail: media!item_configurations_thumbnail_id_fkey(*)
            ),
            assets: item_media_assets(
              *,
              psd: media!item_media_assets_psd_id_fkey(*),
              thumbnail: media!item_media_assets_thumbnail_id_fkey(*)
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
            assets: item_media_assets(*,
              psd: media!item_media_assets_psd_id_fkey(*),
              thumbnail: media!item_media_assets_thumbnail_id_fkey(*),
              user: user_profiles(*)
            ),
            configuration: item_configurations(*, size: product_sizes(*,
              template: media(*)
          )))
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
              product: products(*),
              assets: item_media_assets(*,
                psd: media!item_media_assets_psd_id_fkey(*),
                thumbnail: media!item_media_assets_thumbnail_id_fkey(*),
                user: user_profiles(*)
              ),
              configuration: item_configurations(*,
                size: product_sizes(*),
                main_media: media!item_configurations_main_media_id_fkey(*),
                bg_media: media!item_configurations_bg_media_id_fkey(*),
                thumbnail: media!item_configurations_thumbnail_id_fkey(*)
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
                product: products(*),
                assets: item_media_assets(*,
                  psd: media!item_media_assets_psd_id_fkey(*),
                  thumbnail: media!item_media_assets_thumbnail_id_fkey(*),
                  user: user_profiles(*)
                ),
                configuration: item_configurations(*,
                  size: product_sizes(*)
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
    content: Blob,
    insert: DbTables['media']['Insert'],
    options?: { returnType?: 'url' | 'id'; schedule?: boolean }
  ) {
    if (options?.schedule) {
      if (options.returnType === 'url') {
        throw new Error("Cannot return 'url' when 'schedule' is true");
      }

      const { data: insertData, error: insertError } = await this.supabase
        .from('media')
        .insert(insert)
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
          .upload(insert.path!, content),
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

      if (options?.returnType === 'url') {
        return `${SUPABASE_URL}/storage/v1/object/${insert.bucket_name}/${insert.path}`;
      }

      if (options?.returnType === 'id') {
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
  async itemMediaAssets(insert: DbTables['item_media_assets']['Insert']) {
    const { data, error } = await this.supabase
      .from('item_media_assets')
      .insert(insert)
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error inserting item media assets:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data.id;
  }

  async scheduledUploads(insert: DbTables['scheduled_uploads']['Insert']) {
    const { data, error } = await this.supabase
      .from('scheduled_uploads')
      .insert(insert)
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error inserting scheduled uploads:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data.id;
  }

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
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error inserting item configuration:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data.id;
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
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error inserting order item:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data.id;
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

  scheduledUpload = async (
    id: string,
    update: DbTables['scheduled_uploads']['Update']
  ) => {
    const { data, error } = await this.supabase
      .from('scheduled_uploads')
      .update(update)
      .eq('id', id)
      .select('id')
      .single();

    if (error || !data) {
      console.error('Error updating scheduled upload:', error);
      throw new Error(error.message || 'Unknown error occurred');
    }

    return data.id;
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
