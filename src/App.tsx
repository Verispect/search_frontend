import { useState, useCallback } from 'react';
import { searchProducts } from './api';
import type { Product, SearchResponse } from './types';
import SearchForm from './components/SearchForm';
import ProductCard from './components/ProductCard';
import Pagination from './components/Pagination';
import './App.css';

const DEFAULT_LIMIT = 20;

interface FormParams {
  q: string;
  brand: string;
  category: string;
  country: string;
}

export default function App() {
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentParams, setCurrentParams] = useState<FormParams>({
    q: '', brand: '', category: '', country: '',
  });
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [offset, setOffset] = useState(0);
  const [searched, setSearched] = useState(false);

  const run = useCallback(async (params: FormParams, lim: number, off: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await searchProducts({ ...params, limit: lim, offset: off });
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Request failed');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (params: FormParams, lim: number) => {
    setCurrentParams(params);
    setLimit(lim);
    setOffset(0);
    setSearched(true);
    run(params, lim, 0);
  };

  const handlePage = (newOffset: number) => {
    setOffset(newOffset);
    run(currentParams, limit, newOffset);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClear = () => {
    setData(null);
    setError(null);
    setSearched(false);
    setOffset(0);
  };

  const total   = data?.total   ?? 0;
  const results = data?.results ?? [];
  const page    = Math.floor(offset / limit) + 1;
  const pages   = Math.ceil(total / limit) || 1;

  return (
    <div className="layout">
      <header className="header">
        <span className="logo">Verispect</span>
        <span className="badge">Search</span>
      </header>

      <main className="main">
        <SearchForm onSearch={handleSearch} onClear={handleClear} loading={loading} />

        {error && <div className="error-banner">{error}</div>}

        {searched && !loading && !error && (
          <div className="toolbar">
            <span className="meta">
              {total === 0
                ? 'No results'
                : <>Showing <strong>{offset + 1}–{Math.min(offset + results.length, total)}</strong> of <strong>{total.toLocaleString()}</strong> products</>
              }
            </span>
            {total > 0 && pages > 1 && (
              <span className="meta">Page {page} of {pages}</span>
            )}
          </div>
        )}

        {loading && (
          <div className="loading-row">
            <span className="spinner" />
            Searching…
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="results-grid">
            {results.map((p: Product) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}

        {!loading && searched && !error && results.length === 0 && (
          <div className="empty">
            <div className="empty-icon">🔍</div>
            <strong>No products found</strong>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}

        {!loading && total > limit && (
          <Pagination offset={offset} limit={limit} total={total} onPage={handlePage} />
        )}
      </main>
    </div>
  );
}
