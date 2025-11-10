import { createDirectus, rest, readItems } from '@directus/sdk';

interface Article {
  id: string;
  title: string;
  status: string;
}

interface Articles {
  articles: Article[];
}

export default async function Page() {
  const apiUrl = 'https://cuddly-trout-4jv547pr97v43qgx-8055.app.github.dev';

  const client = createDirectus<Articles>(apiUrl).with(rest());
  const articles = await client.request(readItems('articles', {
    filter: {
      status: {
        _in: ['published', 'draft']
      }
    },
    limit: 2
  }));

  return (<div>
    <ul>
      {articles.map((article: Article) => (
        <li key={article.id}>{article.title} ({article.status})</li>
      ))}
    </ul>
  </div>);
}