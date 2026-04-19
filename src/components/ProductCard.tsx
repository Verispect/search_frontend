import { useState } from 'react';
import type { Product } from '../types';

function fmt(ts?: number) {
  if (!ts) return null;
  return new Date(ts * 1000).toLocaleDateString();
}

export default function ProductCard({ product: p }: { product: Product }) {
  const [expanded, setExpanded] = useState(false);

  const details: [string, string][] = [
    p.quantity     ? ['Quantity',   p.quantity]     : null,
    p.packaging    ? ['Packaging',  p.packaging]    : null,
    p.lang         ? ['Language',   p.lang]         : null,
    p.product_type ? ['Type',       p.product_type] : null,
    fmt(p.created_t)       ? ['Created',  fmt(p.created_t)!]       : null,
    fmt(p.last_modified_t) ? ['Modified', fmt(p.last_modified_t)!] : null,
  ].filter(Boolean) as [string, string][];

  const hasExtras = details.length > 0 || !!p.ingredients_text;

  return (
    <div
      className={`card ${expanded ? 'card-expanded' : ''}`}
      onClick={() => hasExtras && setExpanded(v => !v)}
      style={{ cursor: hasExtras ? 'pointer' : 'default' }}
    >
      <div className="card-header">
        <div className="card-title">{p.product_name || '—'}</div>
        <span className="id-badge">{p.id}</span>
      </div>

      <div className="card-meta">
        {p.brands    && <span><span className="meta-icon">🏷</span>{p.brands}</span>}
        {p.categories && <span><span className="meta-icon">📂</span>{p.categories}</span>}
        {p.countries  && <span><span className="meta-icon">🌍</span>{p.countries}</span>}
      </div>

      {expanded && hasExtras && (
        <div className="card-detail">
          {details.map(([k, v]) => (
            <div className="kv" key={k}>
              <span className="kv-key">{k}:</span>
              <span className="kv-val" title={v}>{v}</span>
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

      {hasExtras && (
        <div className="card-toggle">{expanded ? '▲ Less' : '▼ More'}</div>
      )}
    </div>
  );
}
