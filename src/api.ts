import type { SearchParams, SearchResponse } from './types';

export async function searchProducts(params: SearchParams): Promise<SearchResponse> {
  const qs = new URLSearchParams();
  if (params.q)        qs.set('q',        params.q);
  if (params.brand)    qs.set('brand',    params.brand);
  if (params.category) qs.set('category', params.category);
  if (params.country)  qs.set('country',  params.country);
  qs.set('limit',  String(params.limit));
  qs.set('offset', String(params.offset));

  const res = await fetch(`https://beauty-products-search-116946703378.europe-north2.run.app/v1/search?${qs}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText}${text ? ': ' + text : ''}`);
  }
  return res.json();
}
