import { useState } from 'react';
import {
  useGetArticlesQuery,
  useSearchArticlesQuery,
} from '@informa-onboarding/graphql';

export default function Articles() {
  const [term, setTerm] = useState('');
  const isSearching = term.trim().length > 0;

  const { data: defaultData } = useGetArticlesQuery();
  const { data: searchData } = useSearchArticlesQuery({
    variables: { term },
    skip: !isSearching,
  });

  const articles = isSearching
    ? searchData?.searchArticles
    : defaultData?.getArticles;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Articles</h1>

      <input
        type="text"
        placeholder="Search..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="border p-2 rounded w-full mb-6"
      />

      <div className="space-y-4">
        {articles?.map((article) => (
          <div key={article.uid} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">{article.title}</h2>
            <p>{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
