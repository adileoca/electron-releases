import { useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";

import MiniTableEditSelect from "@/components/ui/MiniTableEditSelect";
import MiniTableEditInput from "@/components/ui/MiniTableEditInput";
import MiniTable from "@/components/ui/MiniTable";
import Spinner from "@/components/ui/Spinner";
import Button from "@/components/ui/Button";
import InfoCard from "./InfoCard";

import { useSupabase } from "@/lib/supabase/context";
import { Order } from "@/lib/supabase/types";

const ShippingCard: React.FC<{ order: Order }> = ({ order }) => {
  const [shipments, setShipments] = useState<Order["shipments"]>(
    (order.shipments || []) as Order["shipments"]
  );
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [awbInput, setAwbInput] = useState("");
  const [savingAwb, setSavingAwb] = useState(false);
  const [awbFeedback, setAwbFeedback] = useState<{
    text: string;
    tone: "success" | "error";
  } | null>(null);
  const { supabase, session } = useSupabase();

  useEffect(() => {
    setShipments((order.shipments || []) as Order["shipments"]);
  }, [order.shipments]);

  const currentShipment = useMemo(() => shipments?.[0], [shipments]);
  const hasShipment = Boolean(currentShipment);

  const createShipment = useCallback(async () => {
    if (!session) return;
    setError(null);
    // Check if the URL is already generated
    if (generatedUrl) {
      window.electron.send("open-link-in-browser", generatedUrl);
      return;
    }

    // Check if the order has shipments and if not generate a new one
    if (!hasShipment) {
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
    if (!currentShipment?.media) {
      setError("Nu există un fișier AWB de descărcat pentru acest colet.");
      return;
    }

    const { bucket_name, path } = currentShipment.media;
    const { data, error } = await supabase.storage
      .from(bucket_name)
      .createSignedUrl(path, 3600); // 1 hour

    if (error) {
      console.log("Error generating signed URL:", error);
      setError(error.message);
      return;
    }
    window.electron.send("open-link-in-browser", data?.signedUrl);
  }, [currentShipment, generatedUrl, hasShipment, order.id, session, supabase]);

  const submitManualAwb = useCallback(async () => {
    if (!session) {
      return {
        errors: {
          AWB: "Nu există o sesiune activă.",
        },
      };
    }

    const trimmed = awbInput.trim();
    if (!trimmed) {
      return {
        errors: {
          AWB: "Introduceți un număr AWB valid.",
        },
      };
    }

    setSavingAwb(true);
    setAwbFeedback(null);

    try {
      const response = await window.electron.apiRequest({
        method: "POST",
        url: "/api/shipment/manual-awb",
        data: {
          orderId: order.id,
          trackingNumber: trimmed,
        },
        session,
      });

      if (response.error || response.status !== 200) {
        const message =
          response.data?.message ||
          response.error ||
          "Nu am putut salva AWB-ul.";
        return {
          errors: {
            AWB: message,
          },
        };
      }

      const manualShipment = response.data?.data?.shipment as
        | Partial<Order["shipments"][number]>
        | undefined;

      if (!manualShipment) {
        return {
          errors: {
            AWB: "Răspuns invalid de la server.",
          },
        };
      }

      const normalizedShipment = {
        ...manualShipment,
        media: manualShipment.media ?? null,
      } as Order["shipments"][number];

      setShipments([normalizedShipment]);
      setGeneratedUrl(null);
      setAwbInput("");
      setAwbFeedback({
        text: "AWB-ul a fost salvat cu succes.",
        tone: "success",
      });
    } catch (submitError) {
      console.error("Failed to save manual AWB", submitError);
      return {
        errors: {
          AWB: "Nu am putut salva AWB-ul.",
        },
      };
    } finally {
      setSavingAwb(false);
    }
  }, [awbInput, order.id, session]);

  const trackingNumber = currentShipment?.tracking_number || null;
  const carrierName = currentShipment?.carrier
    ? currentShipment.carrier.toUpperCase()
    : "UPS";

  const canOpenTracking =
    Boolean(trackingNumber) && carrierName.includes("UPS");

  const awbDisplay = trackingNumber ? (
    canOpenTracking ? (
      <button
        onClick={() =>
          window.electron.send(
            "open-link-in-browser",
            `https://www.ups.com/track?tracknum=${trackingNumber}&loc=en_US&requester=ST/trackdetails`
          )
        }
      >
        {trackingNumber}
      </button>
    ) : (
      trackingNumber
    )
  ) : (
    "-"
  );

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
          Denumire: carrierName,
          AWB: awbDisplay,
        }}
        edit={
          !hasShipment
            ? {
                data: {
                  Denumire: {
                    render: ({ error, clearError }) => (
                      <MiniTableEditSelect
                        label="Denumire"
                        value={carrierName}
                        options={[
                          { label: "UPS", value: "UPS" },
                          { label: "DHL", value: "DHL" },
                          { label: "FedEx", value: "FedEx" },
                          { label: "USPS", value: "USPS" },
                          { label: "Other", value: "Other" },
                        ]}
                        onChange={(value) => {}}
                      />
                    ),
                    config: {
                      fullRow: true,
                      hideLabel: true,
                    },
                  },
                  AWB: {
                    render: ({ error, clearError }) => (
                      <MiniTableEditInput
                        label="AWB"
                        value={awbInput}
                        onChange={(event) => {
                          setAwbInput(event.target.value);
                          if (error) {
                            clearError();
                          }
                          if (awbFeedback) {
                            setAwbFeedback(null);
                          }
                        }}
                        placeholder="Număr AWB"
                        error={Boolean(error)}
                      />
                    ),
                    config: {
                      fullRow: true,
                      hideLabel: true,
                    },
                  },
                },
                onSubmit: submitManualAwb,
                onCancel: () => {
                  setAwbInput("");
                  setAwbFeedback(null);
                },
                submitting: savingAwb,
              }
            : undefined
        }
      />
      {awbFeedback ? (
        <p
          className={clsx(
            "mt-2 text-sm",
            awbFeedback.tone === "success"
              ? "text-emerald-400"
              : "text-amber-400"
          )}
        >
          {awbFeedback.text}
        </p>
      ) : null}
      <div className="mt-4">
        <Button onClick={() => createShipment()}>
          {loading ? (
            <Spinner h="h-3.5" color1="fill-neutral-500" color2="fill-white" />
          ) : null}
          {hasShipment || generatedUrl
            ? "Printeazǎ AWB"
            : loading
            ? "Generez AWB..."
            : "Genereazǎ AWB"}
        </Button>
        {error ? <p className="mt-2 text-sm text-amber-400">{error}</p> : null}
      </div>
    </InfoCard>
  );
};

export default ShippingCard;
