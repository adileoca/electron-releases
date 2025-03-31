import Button from "@/components/ui/Button";
import { useUpload } from "@/hooks/useUpload";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/Spinner";
import { useDatabase } from "@/lib/supabase/context";

const UploadButton = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { getRootProps, getInputProps, open } = useUpload((imageFile: File) => {
    setFile(imageFile);
  });
  const { db } = useDatabase();
  useEffect(() => {
    if (!file) return;

    const uploadFile = async () => {
      setUploading(true);
      const filename = uuid();

      const url = await db.insert.media(
        {
          bucket_name: "public_bucket",
          path: `backgrounds/${filename}`,
          id: filename,
        },
        { content: file, returnType: "url" }
      );

      await db.supabase
        .from("product_backgrounds")
        .insert({ media_id: filename, url });

      setUrl(url);
      setUploading(false);
      setFile(null);
    };
    uploadFile();
  }, [file]);

  return (
    <>
      {url ? <img src={url} width={500} height={500} /> : null}
      <div {...getRootProps()} onClick={open} className="w-full">
        <Button className="flex items-center">
          <input {...getInputProps()} />
          {uploading && (
            <Spinner color1="fill-neutral-500" color2="fill-neutral-100" />
          )}
          <span>{uploading ? "Incarc..." : "Incarca"}</span>
        </Button>
      </div>
    </>
  );
};

export default UploadButton;
