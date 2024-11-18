import { configuratorOptions as options } from "@/constants";
import { formatSize } from "@/utils/format";
import { CartItemsType } from "@/lib/supabase/database";

export const parseConfigurationDetails = (
  configuration: CartItemsType[0]["configuration"][0],
  config: { asObject: boolean }
) => {
  const list = [
    {
      label: "Orientation",
      value: options.orientation.find(
        (option) => option.id === Number(configuration?.orientation)
      )?.label,
    },
    {
      label: "Size",
      value: formatSize(configuration?.size),
    },
    {
      label: "Remove background",
      value: options.removeBackground.find(
        (option) => option.id === Number(configuration?.remove_bg)
      )?.label,
    },

    {
      label: "Edit details",
      value: configuration?.edit_details,
    },
    {
      label: "Preview",
      value: options.wantsPreview.find(
        (option) => option.id === Number(configuration?.wants_preview)
      )?.label,
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
