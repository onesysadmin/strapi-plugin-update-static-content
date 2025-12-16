import { Flex, Button } from '@strapi/design-system';
import { ChevronLeft, ChevronRight, More } from '@strapi/icons';

interface PaginationProps {
  page: number;
  maxPerPage: number;
  numberOfItems: number;
  setPage: (page: number) => void;
}

export function Pagination({ page, numberOfItems, setPage, maxPerPage }: PaginationProps) {
  const totalPages = Math.ceil(numberOfItems / maxPerPage) || 1;

  const handlePrevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page === totalPages) return;
    setPage(page + 1);
  };

  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1).map((item) => {
    return (
      <Button
        key={item}
        size="L"
        onClick={() => setPage(item)}
        variant={item === page ? 'tertiary' : 'ghost'}
      >
        {item}
      </Button>
    );
  })

  return (
    <Flex gap={2}>
      <Button
        size="L"
        onClick={handlePrevPage}
        disabled={page === 1}
        variant="ghost"
        startIcon={<ChevronLeft />}
      />
      {
        pagesArray.length > 5 ? (
            <>
                {pagesArray.slice(0, 2)}
                <More />
                {pagesArray.slice(-1)}
            </>
            ) : (
            pagesArray
            )
      }
      <Button
        size="L"
        onClick={handleNextPage}
        disabled={page === totalPages}
        variant="ghost"
        startIcon={<ChevronRight />}
      />
    </Flex>
  );
}
