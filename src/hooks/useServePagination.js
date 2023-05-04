import { useRouter } from 'next/router';
import { useState } from 'react';

export const useServePagination = (defaultPage = 1) => {
  const router = useRouter();

  const INIT_PAGE = +router.query.page || defaultPage;

  const [currentPage, setCurrentPage] = useState(INIT_PAGE);

  const onPageChange = (page) => {
    setCurrentPage(page);

    router.push(
      {
        query: { ...router.query, page },
      },
      null,
      { scroll: false }
    );
  };

  return {
    currentPage,
    onPageChange,
  };
};
