import { useState } from 'react';

interface Props {
  loading: boolean;
  onSearch: (params: { q: string; brand: string; category: string; country: string }, limit: number) => void;
  onClear: () => void;
}

export default function SearchForm({ loading, onSearch, onClear }: Props) {
  const [q,        setQ]        = useState('');
  const [brand,    setBrand]    = useState('');
  const [category, setCategory] = useState('');
  const [country,  setCountry]  = useState('');
  const [limit,    setLimit]    = useState(20);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ q, brand, category, country }, limit);
  };

  const handleClear = () => {
    setQ(''); setBrand(''); setCategory(''); setCountry(''); setLimit(20);
    onClear();
  };

  return (
    <form className="search-panel" onSubmit={handleSubmit}>
      <div className="search-row">
        <input
          className="input"
          type="text"
          placeholder="Search products…"
          value={q}
          onChange={e => setQ(e.target.value)}
          autoComplete="off"
        />
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? <><span className="spinner-sm" /> Searching…</> : 'Search'}
        </button>
        <button className="btn-secondary" type="button" onClick={handleClear}>
          Clear
        </button>
      </div>

      <div className="filters">
        <input className="input" type="text" placeholder="Brand"    value={brand}    onChange={e => setBrand(e.target.value)} />
        <input className="input" type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <input className="input" type="text" placeholder="Country"  value={country}  onChange={e => setCountry(e.target.value)} />
        <select
          className="input"
          value={limit}
          onChange={e => setLimit(Number(e.target.value))}
        >
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
          <option value={100}>100 per page</option>
        </select>
      </div>
    </form>
  );
}
