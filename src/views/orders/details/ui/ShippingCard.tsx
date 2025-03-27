import { useState } from "react";
import axios from "axios";

import MiniTable from "@/components/ui/MiniTable";
import Spinner from "@/components/ui/Spinner";
import Button from "@/components/ui/Button";
import InfoCard from "./InfoCard";

import { useSupabase } from "@/lib/supabase/context";
import { Order } from "@/lib/supabase/types";
import { electron } from "process";

const ShippingCard: React.FC<{ order: Order }> = ({ order }) => {
  const [generatedUrl, setGeneratedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { supabase } = useSupabase();
  return (
    <InfoCard title="Shipping Information">
      <MiniTable
        title="Adresa de livrare"
        data={{
          Țarǎ: order.shipping_address?.country!,
          Regiune: order.shipping_address?.state!,
          Oraș: order.shipping_address?.city!,
          "Linie 1": order.shipping_address?.line_1!,
          "Linie 2": order.shipping_address?.line_2 || "-",
          "Cod poştal": order.shipping_address?.postal_code!,
        }}
      />

      <MiniTable
        title="Curier"
        data={{
          Denumire: "UPS",
          AWB: order.shipments[0]?.tracking_number ? (
            <button
              onClick={() =>
                window.electron.send(
                  "open-link",
                  `https://www.ups.com/track?tracknum=${order.shipments[0]?.tracking_number}&loc=en_US&requester=ST/trackdetails`
                )
              }
            >
              {order.shipments[0]?.tracking_number}
            </button>
          ) : (
            "-"
          ),
        }}
      />
      <div className="mt-4">
        <Button
          onClick={async () => {
            if (generatedUrl) {
              window.electron.send("print-label", generatedUrl);
              return;
            }

            if (order.shipments.length === 0) {
              setLoading(true);
              const response = await axios.post(
                "http://localhost:3000/api/ups/create-shipping",
                { orderId: order.id },
                {}
              );

              console.log("response.data.data", response.data.data);
              const { url } = response.data.data;
              setLoading(false);
              setGeneratedUrl(url);

              window.electron.send("print-label", url);
              return;
            }

            const { bucket_name, path } = order.shipments[0].media!;
            const { data, error } = await supabase.storage
              .from(bucket_name)
              .createSignedUrl(path, 3600);
            console.log("signedUrl", data?.signedUrl);
            if (error) console.log("error", error);

            window.electron.send("print-label", data?.signedUrl);
          }}
        >
          {loading ? (
            <Spinner h="h-3.5" color1="fill-neutral-500" color2="fill-white" />
          ) : null}
          {order.shipments.length !== 0 || generatedUrl
            ? "Printeazǎ AWB"
            : loading
            ? "Generez AWB..."
            : "Genereazǎ AWB"}
        </Button>
      </div>
    </InfoCard>
  );
};

export default ShippingCard;
