export default function useFetch<TData>(url: string): [TData, boolean, () => void];
