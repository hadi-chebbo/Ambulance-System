type PaginationProps = {
  currentPage: number;
  lastPage: number;
  onPrevious: () => void;
  onNext: () => void;
};

export default function Pagination({
  currentPage,
  lastPage,
  onPrevious,
  onNext,
}: PaginationProps) {
  if (lastPage <= 1) return null;

  return (
    <div className="flex justify-between items-center px-8 py-4 border-t">
      <button
        disabled={currentPage === 1}
        onClick={onPrevious}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span className="text-sm text-slate-500">
        Page {currentPage} of {lastPage}
      </span>

      <button
        disabled={currentPage === lastPage}
        onClick={onNext}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}