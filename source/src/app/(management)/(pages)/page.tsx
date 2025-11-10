import { createDirectus, rest, readItems } from '@directus/sdk';

interface Article {
  id: string;
  title: string;
}

interface Schema {
  articles: Article[];
}

export default async function Page() {
  const apiUrl = 'https://cuddly-trout-4jv547pr97v43qgx-8055.app.github.dev';
  //const directus = createDirectus<Schema>(apiUrl).with(rest());

  const client = createDirectus<Schema>(apiUrl).with(rest());
  const result = await client.request(readItems('articles'));
  const articles = result;

  return (<div>
    <ul>
      {articles.map((article: Article) => (
        <li key={article.id}>{article.title}</li>
      ))}
    </ul>
  </div>);
}