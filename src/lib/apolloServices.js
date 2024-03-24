import { gql } from "@apollo/client";

export class OrdersService {
  static query = gql`
    query GetOrders {
      sales_orders {
        amount_discount
        amount_refunded
        amount_shipping
        amount_total
        amount_tax
        amount_subtotal
        created_at
        currency
        email
        id
        name
        phone_number
        payment_status
        payment_details
        status
        status_updated
        stripe_checkout_session_id
        stripe_customer_id
        billing_address {
          created_at
          country
          city
          line1
          line2
          postal_code
          state
          updated_at
        }
        order_items {
          amount_discount
          amount_subtotal
          amount_tax
          amount_total
          options
          id
          name
          currency
          order_id
          product_code
          quantity
          stripe_price_id
          stripe_product_id
        }
        shipping_address {
          city
          country
          created_at
          line2
          line1
          id
          postal_code
          state
          updated_at
        }
        user {
          email
          name
        }
      }
    }
  `;
  static parse = (data) => {
    console.log("dataaa", data);
    return data.sales_orders.map((order) => ({
      id: order.id,
      amount_discount: order.amount_discount,
      amount_refunded: order.amount_refunded,
      amount_shipping: order.amount_shipping,
      amount_total: order.amount_total,
      amount_tax: order.amount_tax,
      amount_subtotal: order.amount_subtotal,
      created_at: order.created_at,
      currency: order.currency,
      email: order.email,
      name: order.name,
      phone_number: order.phone_number,
      payment_status: order.payment_status,
      payment_details: order.payment_details,
      status: order.status,
      status_updated: order.status_updated,
      stripe_checkout_session_id: order.stripe_checkout_session_id,
      stripe_customer_id: order.stripe_customer_id,
      billing_address: order.billing_address,
      order_items: order.order_items.map((item) => ({
        amount_discount: item.amount_discount,
        amount_subtotal: item.amount_subtotal,
        amount_tax: item.amount_tax,
        amount_total: item.amount_total,
        options: item.options,
        id: item.id,
        name: item.name,
        currency: item.currency,
        order_id: item.order_id,
        product_code: item.product_code,
        quantity: item.quantity,
        stripe_price_id: item.stripe_price_id,
        stripe_product_id: item.stripe_product_id,
      })),
      shipping_address: order.shipping_address,
      user: {
        email: order.user.email,
        name: order.user.name,

        stripe_customer_id: order.user.stripe_customer_id,
      },
    }));
  };
}
