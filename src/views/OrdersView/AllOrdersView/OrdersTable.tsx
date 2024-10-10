import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { OrdersSummaryType } from "@/lib/supabase/database";
import { generateTableData } from "./generateTableData";
import { ResizableBox } from "react-resizable";
import { formatDate } from "@/utils/format";
import CheckboxInput from "./CheckboxInput";
import Spinner from "@/static/spinner.svg";
import { useTable } from "./context";
import clsx from "clsx";

const OrdersTable: React.FC<{
  setSelectedOrder: Dispatch<SetStateAction<string | null>>;
}> = ({ setSelectedOrder }) => {
  const table = useTable();

  const [widths, setWidths] = useState([
    60,
    ...table.cols.map((header) => header.initialWidth),
  ]);

  return (
    <div
      style={{ width: "calc(100% - 234px)" }}
      className="fixed -right-1.5 top-12 h-screen overflow-hidden"
    >
      <div className="relative h-full overflow-auto ">
        <table>
          <TableHeader setWidths={setWidths} widths={widths} />
          {false ? (
            <div
              style={{
                width: "calc(100% - 240px)",
                height: "calc(100% - 96px)",
              }}
              className="fixed w-full bg-neutral-900/90"
            >
              <div className="flex h-full items-center justify-center">
                <img
                  className="mb-10 block h-8 w-auto rounded-full ring-blue-500 ring-offset-2 transition hover:ring-2 lg:h-12"
                  src={Spinner}
                  alt=""
                  loading="eager"
                />
              </div>
            </div>
          ) : (
            <TableBody
              setSelectedOrderId={setSelectedOrder}
              widths={widths}
              orders={orders}
            />
          )}
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;

const TableBody = ({ widths, orders, setSelectedOrderId }) => {
  const [enabled, setEnabled] = useState(false);
  return (
    <tbody>
      {orders &&
        Array(24)
          .fill(orders[0])
          .map((order, idx) => (
            <tr
              key={idx}
              // onClick={() => setSelectedOrder(order.id)}
              className="group items-center"
            >
              <TdWrapper className="is-sticky group sticky left-0 p-0">
                <CheckboxInput checked={enabled} onChange={setEnabled} />
              </TdWrapper>

              <TdWrapper
                className="is-sticky group sticky"
                style={{ left: `${widths[0]}px` }} //todo: calculate dynamically
              >
                <button
                  onClick={() => setSelectedOrderId(order.id)}
                  className="whitespace-nowrap font-medium hover:text-blue-700"
                >
                  {order.display_name}
                </button>
              </TdWrapper>
              <TdWrapper>
                <span>{formatDate(order.created_at)}</span>
              </TdWrapper>
              <TdWrapper>
                <span className="items-center rounded-md border border-neutral-200 bg-neutral-100 px-3 py-1 text-sm capitalize text-neutral-600 dark:border-blue-500 dark:bg-blue-700 dark:text-blue-100">
                  {order.status!.name}
                </span>
              </TdWrapper>
              <TdWrapper>{order.totals?.amount_total}</TdWrapper>
              <TdWrapper>
                &nbsp;{order.shipping_address?.state},&nbsp;
                {order.shipping_address?.country}
              </TdWrapper>
            </tr>
          ))}
    </tbody>
  );
};

const TableHeader = ({ widths, setWidths }) => {
  const table = useTable();

  useEffect(() => {
    console.log("widths", widths);
  }, [widths]);

  const onResize = (index: number, newWidth: number) => {
    setWidths((prevWidths: number[]) => {
      const newWidths = [...prevWidths];
      newWidths[index] = newWidth;
      return newWidths;
    });
  };

  return (
    <thead>
      <tr>
        <th key={0} className="sticky left-0 top-0 z-30 p-0 hover:z-[35]">
          <ResizableBox
            width={table.checkboxCol.width}
            minConstraints={table.checkboxCol.minConstraints}
            maxConstraints={[1000, 0]}
            className="border-none p-0"
            axis="x"
            resizeHandles={["e"]}
            onResize={(_, data) => onResize(0, data.size.width)}
          >
            <div className="flex h-12 items-center border-b border-r border-neutral-300 bg-neutral-50 px-4 backdrop-blur dark:border-neutral-700 dark:bg-neutral-900">
              <p className="text-left font-medium text-neutral-600 dark:text-neutral-300">
                <CheckboxInput checked={false} onChange={() => {}} />
              </p>
            </div>
          </ResizableBox>
        </th>

        {table.cols.map((col, index) => {
          let idx = index + 1;
          let thStyle = {};
          if (col.isSticky) {
            const prevRowsWidth = idx > 0 ? accPrevWidths(widths, idx) : 0;
            thStyle = { left: `${prevRowsWidth}px` };
          }

          return (
            <th
              key={idx}
              style={thStyle}
              className={clsx(
                col.isSticky ? "z-30 hover:z-[35]" : "",
                "sticky top-0 z-20 p-0 hover:z-[25]"
              )}
            >
              <ResizableBox
                width={col.width}
                minConstraints={[
                  col.minConstraints[0], // 33 is
                  col.minConstraints[1],
                ]}
                maxConstraints={[1000, 0]} // Optional max width
                className="border-none p-0" // Apply no padding and no borders
                axis="x"
                resizeHandles={["e"]}
                onResize={(_, data) => onResize(idx, data.size.width)}
              >
                <div className="flex h-12 items-center border-b border-r border-neutral-300 bg-neutral-50 px-4 backdrop-blur dark:border-neutral-700 dark:bg-neutral-900">
                  <p className="text-left font-medium text-neutral-600 dark:text-neutral-300">
                    {col.Component ? col.Component : col.label}
                  </p>
                </div>
              </ResizableBox>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

const TdWrapper = ({ children, className = "", style = {} }) => (
  <td style={style} className={clsx("p-0", className)}>
    <div className="duration-50 flex h-12 w-full items-center border-y border-r border-neutral-200 border-t-transparent bg-white px-4 text-neutral-600 transition group-hover:bg-blue-50 group-[.is-sticky]:bg-neutral-900 dark:border-neutral-700 dark:border-t-transparent dark:bg-neutral-900/90 dark:text-neutral-200 group-hover:dark:bg-neutral-800 ">
      {children}
    </div>
  </td>
);

const accPrevWidths = (widths: number[], index: number) =>
  widths.slice(0, index).reduce((acc, value) => acc + value, 0);

const orders = [
  {
    id: "b670e6bc-71f5-42de-9ee3-686066cc69ae",
    created_at: "2024-09-14T12:10:50.726215+00:00",
    email: "adileoca@yahoo.com",
    name: "Adi Leoca",
    phone: "+40749029993",
    stripe_checkout_id:
      "cs_test_a1eh32rnm0BZAFvS4zrs2EAGlXzpA14K4bcc8BMen0fwaEQ7xxGKAQwamj",
    billing_address_id: "8bd4f9ea-94d2-405d-a14f-8d6ea05c0819",
    shipping_address_id: "d022e9ed-f81b-4357-9fdb-4feaea8e8969",
    payment_id: "3f3aedb7-8af7-45b7-aa86-c9b1c4f4a39f",
    status_id: "e6faecf6-6803-4c5a-8e4c-fd8e534e5093",
    totals_id: "730a575a-b8d1-454b-a846-851e188aebca",
    user_id: "7921580b-e675-4865-9c19-30637b4407e9",
    display_name: "779482625",
    totals: {
      id: "730a575a-b8d1-454b-a846-851e188aebca",
      currency: "usd",
      amount_tax: 226,
      amount_total: 1416,
      amount_discount: 0,
      amount_refunded: null,
      amount_shipping: 0,
      amount_subtotal: 1190,
    },
    status: {
      id: "e6faecf6-6803-4c5a-8e4c-fd8e534e5093",
      name: "placed",
      timestamp: "2024-09-14T12:10:50.456286+00:00",
    },
    payment: {
      id: "3f3aedb7-8af7-45b7-aa86-c9b1c4f4a39f",
      status: "paid",
      details: {
        id: "pm_1PyuoJLzcurVh6mDjllf374D",
        card: {
          brand: "visa",
          last4: "4242",
          checks: {
            cvc_check: "pass",
            address_line1_check: "pass",
            address_postal_code_check: "pass",
          },
          wallet: null,
          country: "US",
          funding: "credit",
          exp_year: 2027,
          networks: {
            available: ["visa"],
            preferred: null,
          },
          exp_month: 12,
          fingerprint: "tPnkguLCvmKrapPr",
          display_brand: "visa",
          generated_from: null,
          three_d_secure_usage: {
            supported: true,
          },
        },
        type: "card",
        object: "payment_method",
        created: 1726315843,
        customer: null,
        livemode: false,
        metadata: {},
        allow_redisplay: "limited",
        billing_details: {
          name: "Adi Leoca",
          email: "adileoca@yahoo.com",
          phone: null,
          address: {
            city: "Buzau",
            line1: "Unirii Nord",
            line2: "bl 22 ap 11",
            state: "Buzau",
            country: "RO",
            postal_code: "120020",
          },
        },
      },
      invoice_url:
        "https://invoice.stripe.com/i/acct_1ImzozLzcurVh6mD/test_YWNjdF8xSW16b3pMemN1clZoNm1ELF9RcWMySkN5THRKR2VSUDhMWXBiQUtqRDNNdFAxb2hZLDExNjg1NjY1MA0200xo9F6nve?s=ap",
    },
    billing_address: {
      id: "8bd4f9ea-94d2-405d-a14f-8d6ea05c0819",
      city: "Buzau",
      state: "Buzau",
      line_1: "Unirii Nord",
      line_2: "bl 22 ap 11",
      country: "RO",
      created_at: "2024-09-14T12:10:50.537642+00:00",
      postal_code: "120020",
    },
    shipping_address: {
      id: "d022e9ed-f81b-4357-9fdb-4feaea8e8969",
      city: "Buzau",
      state: "Buzau",
      line_1: "Unirii Nord",
      line_2: "bl 22 ap 11",
      country: "RO",
      created_at: "2024-09-14T12:10:50.564259+00:00",
      postal_code: "120020",
    },
  },
];
