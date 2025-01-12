import { useEffect, useState } from "react";

export function useFetchData<T>(promise: Promise<T>) {
  const [data, setData] = useState<T>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await promise;
        setData(result);
      } catch (err) {
        console.error("Unexpected error: ", err);
      }
    };

    fetchData();
  }, []);

  return data;
}
