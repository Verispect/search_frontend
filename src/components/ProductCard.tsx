import type { Product } from '../types';

function fmt(ts?: number) {
  if (!ts) return null;
  return new Date(ts * 1000).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function ProductCard({ product: p }: { product: Product }) {
  const details: { label: string; value: string }[] = [
    p.quantity     ? { label: 'Quantity',     value: p.quantity }     : null,
    p.packaging    ? { label: 'Packaging',    value: p.packaging }    : null,
    p.product_type ? { label: 'Type',         value: p.product_type } : null,
    p.lang         ? { label: 'Language',     value: p.lang }         : null,
    fmt(p.created_t)       ? { label: 'Added',    value: fmt(p.created_t)! }       : null,
    fmt(p.last_modified_t) ? { label: 'Updated',  value: fmt(p.last_modified_t)! } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const hasDetails = details.length > 0 || !!p.ingredients_text;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">{p.product_name || '—'}</div>
        <span className="id-badge">{p.id}</span>
      </div>

      <div className="card-meta">
        {p.brands     && <span><span className="meta-icon">🏷</span>{p.brands}</span>}
        {p.categories && <span><span className="meta-icon">📂</span>{p.categories}</span>}
        {p.countries  && <span><span className="meta-icon">🌍</span>{p.countries}</span>}
      </div>

      {hasDetails && (
        <div className="card-detail">
          {details.map(({ label, value }) => (
            <div key={label} className="kv">
              <span className="kv-key">{label}:</span>
              <span className="kv-val" title={value}>{value}</span>
            </div>
          ))}

          {p.ingredients_text && (
            <div className="kv kv-full">
              <span className="kv-key">Ingredients:</span>
              <span className="kv-val">{p.ingredients_text}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
