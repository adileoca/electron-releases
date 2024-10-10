import { useEffect, useState } from "react";
import { PostgrestSingleResponse, PostgrestError } from "@supabase/supabase-js";

export function useFetchData<T>(
  dataFetcher: () => Promise<PostgrestSingleResponse<T>>
) {
  const [data, setData] = useState<T | null | undefined>(undefined);
  const [error, setError] = useState<PostgrestError | null | unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await dataFetcher();
        if (error) {
          console.error("Error fetching data: ", error);
          setData(null);
          setError(error);
        } else {
          setData(data);
          setError(null);
        }
      } catch (err) {
        console.error("Unexpected error: ", err);
        setError(err);
      }
    };

    fetchData();
  }, []);

  return { data, error };
}
