import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/Spinner";

import { ContextData, RowPropsMap, ContextState } from "../types";

import { formatSize } from "@/lib/utils/format";
import { ContextActions } from "../reducer";
import CheckboxInput from "@/components/ui/CheckboxInput";
import Button from "@/components/ui/Button";

import { useDatabase } from "@/lib/supabase/context";
import { useUpload } from "@/hooks/useUpload";
import { TemplatesData } from "../../queries/getTemplates";
import { v4 as uuid } from "uuid";
import Database from "@/lib/supabase/database";

export const useParseRows = (
  state: ContextState,
  data: ContextData,
  actions: ContextActions
) => {
  const { db } = useDatabase();
  useEffect(() => {
    console.log("state.selected", state.selected);
  }, [state.selected]);

  useEffect(() => {
    if (!data) return;

    const rows = data
      .sort((a, b) => {
        const nameA = a.product?.name || "";
        const nameB = b.product?.name || "";

        // First compare by name length (longer names first)
        const nameLengthComparison = nameB.length - nameA.length;

        // If names have the same length, then sort by width_cm
        if (nameLengthComparison === 0) {
          return a.width_cm! + a.height_cm! - b.width_cm! - b.height_cm!;
        }

        // Otherwise, return the name length comparison
        return nameLengthComparison;
      })

      .reduce((acc, entry) => {
        // const currency = new CurrencyFormatter(entry.totals?.currency!);

        acc.push({
          checkbox: {
            Component: (
              <CheckboxInput
                checked={state.selected.includes(entry.id.toString())}
                onChange={(checked) =>
                  actions.setSelected(
                    checked
                      ? [...state.selected, entry.id.toString()]
                      : state.selected.filter(
                          (id) => id !== entry.id.toString()
                        )
                  )
                }
              />
            ),
          },
          id: {
            text: entry.id.toString(),
          },
          product_name: {
            text: entry.product?.name!,
          },
          size: {
            text: formatSize(entry),
          },
          download_template: {
            Component: (
              <>
                {entry.template && (
                  <DownloadButton db={db} template={entry.template} />
                )}
              </>
            ),
          },
          upload_template: {
            Component: <UploadButton db={db} id={entry.id} />,
          },
        });
        return acc;
      }, [] as RowPropsMap[]);

    actions.setRows(rows);
  }, [data, state.selected]);
};

const UploadButton: React.FC<{ db: Database; id: number }> = ({ db, id }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { getRootProps, getInputProps, open } = useUpload((imageFile: File) => {
    setFile(imageFile);
  });

  useEffect(() => {
    if (!file) return;

    const uploadFile = async () => {
      setUploading(true);
      const filename = uuid();
      await Promise.all([
        db.insert.media(
          {
            bucket_name: "private_bucket",
            path: `templates/${filename}`,
            id: filename,
          },
          { content: file }
        ),
        db.supabase
          .from("product_sizes")
          .update({ template_id: filename })
          .eq("id", id),
      ]);

      setUploading(false);
      setFile(null);
    };
    uploadFile();
  }, [file]);

  return (
    <div {...getRootProps()} onClick={open} className="w-full">
      <Button className="flex items-center">
        <input {...getInputProps()} />
        {uploading && (
          <Spinner color1="fill-neutral-500" color2="fill-neutral-100" />
        )}
        <span>{uploading ? "Incarc..." : "Incarca"}</span>
      </Button>
    </div>
  );
};

const DownloadButton: React.FC<{
  db: Database;
  template: NonNullable<TemplatesData[0]["template"]>;
}> = ({ db, template }) => {
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!downloading) return;
    const downloadFile = async () => {
      setDownloading(true);
      const { data } = await db.supabase.storage
        .from("private_bucket")
        .createSignedUrl(template.path, 60 * 5); // 5 mins

      if (data?.signedUrl) {
        const a = document.createElement("a");
        a.href = data.signedUrl;
        a.download = template.path.split("/").pop() || "template";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      setDownloading(false);
    };

    downloadFile();
    setDownloading(false);
  }, [downloading]);

  return (
    <Button
      onClick={() => setDownloading(true)}
      className="border-blue-500 bg-blue-600 hover:border-blue-400 hover:bg-blue-500"
    >
      {/* {downloading && <Spinner color1="fill-blue-500" color2="fill-blue-100" />} */}
      <span>Descarca</span>
    </Button>
  );
};
