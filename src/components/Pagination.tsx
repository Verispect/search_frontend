interface Props {
  offset: number;
  limit: number;
  total: number;
  onPage: (offset: number) => void;
}

export default function Pagination({ offset, limit, total, onPage }: Props) {
  const page  = Math.floor(offset / limit) + 1;
  const pages = Math.ceil(total / limit);

  return (
    <div className="pagination">
      <button
        className="btn-secondary"
        disabled={offset <= 0}
        onClick={() => onPage(Math.max(0, offset - limit))}
      >
        ← Prev
      </button>
      <span className="page-info">Page {page} of {pages}</span>
      <button
        className="btn-secondary"
        disabled={offset + limit >= total}
        onClick={() => onPage(offset + limit)}
      >
        Next →
      </button>
    </div>
  );
}
