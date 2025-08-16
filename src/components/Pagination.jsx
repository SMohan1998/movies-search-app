export default function Pagination({ currentPage, totalResults, onChange }) {
  const totalPages = Math.ceil(Number(totalResults || 0) / 10);
  if (!totalPages || totalPages <= 1) return null;

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <div className="mt-6 flex items-center justify-center space-x-3">
      <button
        onClick={() => onChange(currentPage - 1)}
        disabled={!canPrev}
        className="px-3 py-1 rounded border disabled:opacity-50"
      >
        Prev
      </button>
      <span className="text-sm">Page {currentPage} of {totalPages}</span>
      <button
        onClick={() => onChange(currentPage + 1)}
        disabled={!canNext}
        className="px-3 py-1 rounded border disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
