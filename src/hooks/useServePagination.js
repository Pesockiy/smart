import { useRouter } from 'next/router';
import { useState } from 'react';

export const useServePagination = (defaultPage = 1) => {
  const router = useRouter();

  const INIT_PAGE = +router.query.page || defaultPage;

  const [currentPage, setCurrentPage] = useState(INIT_PAGE);

  const onPageChange = (page) => {
    setCurrentPage(page);

    const params = new URLSearchParams({ page });

    router.push(`?${params}`);
  };

  return {
    currentPage,
    onPageChange,
  };
};
