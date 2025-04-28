import { configuratorOptions as options } from "@/constants";
import { formatSize } from "@/lib/utils/format";
import { CartItemsType } from "@/lib/supabase/database";
import { OrderDetailedType } from "@/lib/supabase/database";
export const parseConfigurationDetails = (
  configuration: OrderDetailedType["items"][0]["configuration"] ,
  config: { asObject: boolean }
) => {
  const list = [
    {
      label: "Drientare",
      value: options.orientation.find(
        (option) => option.id === Number(configuration?.orientation)
      )?.label,
    },
    {
      label: "Dimensiune",
      value: formatSize(configuration?.size),
    },
    {
      label: "Personalizare fundal",
      value: options.removeBackground.find(
        (option) => option.id === Number(configuration?.remove_bg)
      )?.label,
    },

    {
      label: "Detalii de editare",
      value: configuration?.edit_details,
    },
    {
      label: "Detalii text",
      value: configuration?.text_details,
    },
    {
      label: "Previzualizare",
      value: options.wantsPreview.find(
        (option) => option.id === Number(configuration?.wants_preview)
      )?.label,
    },
    {
      label: "Are template",
      value: configuration?.size?.template_id ? "Da" : "Nu",
    },
  ];

  if (config.asObject) {
    return list.reduce((accumulator, { value, label }) => {
      if (value) accumulator[label] = value;
      return accumulator;
    }, {});
  }

  return list;
};

export function mimeToExtension(mimeType: string): string | null {
  const mimeTypes = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    // Add more MIME types and their corresponding extensions as needed
    "application/pdf": "pdf",
    "text/html": "html",
    "application/json": "json",
    // Add more as needed
  };

  return mimeTypes[mimeType] || null;
}
