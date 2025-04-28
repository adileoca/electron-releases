import { useCallback, useState } from "react";
import axios from "axios";

import MiniTable from "@/components/ui/MiniTable";
import Spinner from "@/components/ui/Spinner";
import Button from "@/components/ui/Button";
import InfoCard from "./InfoCard";

import { useSupabase } from "@/lib/supabase/context";
import { Order } from "@/lib/supabase/types";
import { electron } from "process";

const ShippingCard: React.FC<{ order: Order }> = ({ order }) => {
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { supabase, session } = useSupabase();

  const createShipment = useCallback(async () => {
    if (!session) return
    // Check if the URL is already generated
    if (generatedUrl) {
      window.electron.send("open-link-in-browser", generatedUrl);
      return;
    }

    // Check if the order has shipments and if not generate a new one
    if (order.shipments.length === 0) {
      setLoading(true);

      const { url, error } = await window.electron.createShipment({
        order_id: order.id,
        session,
      });

      if (error) {
        console.log("Error generating signed URL:", error);
        setLoading(false);
        setError(error);
        return;
      }

      window.electron.send("open-link-in-browser", url);
      setGeneratedUrl(url);
      setLoading(false);
      return;
    }

    // If the order has shipments, open the link
    const { bucket_name, path } = order.shipments[0].media!;
    const { data, error } = await supabase.storage
      .from(bucket_name)
      .createSignedUrl(path, 3600); // 1 hour

    if (error) {
      console.log("Error generating signed URL:", error);
      setError(error.message);
      return;
    }
    window.electron.send("open-link-in-browser", data?.signedUrl);
  }, [order, generatedUrl, session, supabase]);

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
                  "open-link-in-browser",
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
        <Button onClick={() => createShipment()}>
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
