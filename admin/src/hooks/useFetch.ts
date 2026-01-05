import { useFetchClient } from '@strapi/strapi/admin';
import { useEffect, useState } from 'react';

export default function useFetch<TData>(url: string, skip = false, initialData?: TData): [TData, boolean, () => void] {
  const [data, setData] = useState<TData>(initialData ?? {} as TData);
  const [isLoading, setIsLoading] = useState(true);
  const [refetch, setRefetch] = useState({});
  const { get } = useFetchClient();

  function handleRefetch() {
    /* Set an object with a new reference to force a refetch on demand. */
    setRefetch({});
  }

  useEffect(() => {
    if (skip) {
      setIsLoading(false);
      return;
    }

    const abortController = new AbortController();
    const { signal } = abortController;

    (async function fetch() {
      setIsLoading(true);
      try {
        const response = await get(url, { signal });
        setData(response.data);
      } catch (err: unknown) {
        console.error(err);
        // Keep the initial data state on error to prevent type mismatches
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [refetch, url, skip]);

  return [data, isLoading, handleRefetch];
}
