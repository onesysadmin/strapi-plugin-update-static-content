interface PaginationProps {
    page: number;
    maxPerPage: number;
    numberOfItems: number;
    setPage: (page: number) => void;
}
export declare function Pagination({ page, numberOfItems, setPage, maxPerPage }: PaginationProps): import("react/jsx-runtime").JSX.Element;
export {};
