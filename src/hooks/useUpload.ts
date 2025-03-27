import { useDropzone } from "react-dropzone";

const ACCEPTED_TYPES = {
  "image/jpeg": [".jpeg", ".jpg"],
  "image/png": [".png"],
};

const MAX_SIZE = 1024;

export const useUpload = (callback: any) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    // accept: ACCEPTED_TYPES,
    onDrop: async (acceptedFiles: any) => {
      const file = acceptedFiles[0];
      callback(file);
    },
  });
  return { getRootProps, getInputProps, open };
};
