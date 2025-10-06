// src/components/Pagination.tsx
type Props = {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  limit,
  total,
  onPageChange,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  function go(p: number) {
    const clamped = Math.min(Math.max(1, p), totalPages);
    if (clamped !== page) onPageChange(clamped);
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
      <div className="order-2 w-full text-center sm:order-1 sm:w-auto sm:text-left">
        Page <span className="font-medium">{page}</span> of{" "}
        <span className="font-medium">{totalPages}</span>
      </div>
      <div className="order-1 w-full sm:order-2 sm:w-auto">
        <div className="inline-flex w-full justify-center rounded-lg border border-slate-300 bg-white shadow-sm sm:w-auto">
          <button
            className="px-3 py-2 text-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed hover:bg-slate-50 rounded-l-lg"
            onClick={() => go(1)}
            disabled={page === 1}
          >
            «
          </button>
          <button
            className="px-3 py-2 text-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed hover:bg-slate-50 border-l border-slate-200"
            onClick={() => go(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          <button
            className="px-3 py-2 text-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed hover:bg-slate-50 border-l border-slate-200"
            onClick={() => go(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
          <button
            className="px-3 py-2 text-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed hover:bg-slate-50 border-l border-slate-200 rounded-r-lg"
            onClick={() => go(totalPages)}
            disabled={page === totalPages}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
