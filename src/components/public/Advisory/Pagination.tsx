const Pagination = ({
  page,
  setPage,
  totalPages = 1,
}: {
  page: number;
  setPage: (page: number) => void;
  totalPages?: number;
}) => {
  const handleFirst = () => {
    if (page !== 1) setPage(1);
  };

  const handleLast = () => {
    if (page !== totalPages) setPage(totalPages);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className='flex justify-center mt-4 gap-2 text-sm'>
      <button
        onClick={handleFirst}
        disabled={page === 1}
        className='px-3 py-1 border rounded disabled:opacity-50'
      >
        처음
      </button>
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className='px-3 py-1 border rounded disabled:opacity-50'
      >
        이전
      </button>
      <span className='px-3 py-1'>{page}</span>
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className='px-3 py-1 border rounded disabled:opacity-50'
      >
        다음
      </button>
      <button
        onClick={handleLast}
        disabled={page === totalPages}
        className='px-3 py-1 border rounded disabled:opacity-50'
      >
        마지막
      </button>
    </div>
  );
};

export default Pagination;
