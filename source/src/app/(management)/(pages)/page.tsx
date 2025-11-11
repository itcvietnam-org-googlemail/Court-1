import { createDirectus, rest, readItems, createItem , Query } from '@directus/sdk';
import { JSX } from 'react';

interface Category {
  id: string;
  name: string;
  status: string;
  articles: ArticleCategory[];
}

interface Article {
  id: string;
  title: string;
  status: string;
  categories: ArticleCategory[];
}

interface ArticleCategory {
  id: number;
  articles_id: Article;
  categories_id: Category;
}

interface ManySchema {
  articles: Article[];
  categories: Category[];
  articles_categories: ArticleCategory[];
}

export default async function Page() {
  const apiUrl = 'https://cuddly-trout-4jv547pr97v43qgx-8055.app.github.dev';

  const query: Query<ManySchema, Article> = {
    limit: 20,
    offset: 0,
  };

  const client = createDirectus<ManySchema>(apiUrl).with(rest());
  const articles = await client.request(readItems('articles', {
    filter: {
      status: {
        _in: ['draft', 'published']
      },
      categories: {
        categories_id: {
          status: {
            _in: ['published']
          }
        }
      }
    },
    //search: 'art',
    fields: [
      '*',
      {
        categories: [
          {
            categories_id: ['*']
          }
        ]
      }
    ],
    sort: ['-title'],
    deep: {
      categories: {
        _limit: 10
      }
    }
  }));

  console.log(articles);

  ///////
  //const client = createDirectus(apiUrl).with(rest());
  /*
  const result = await client.request(createItem('articles', {
    title: 'Article 4.2',
    status: 'draft',
    categories: [
      {
        categories_id: {
          id: '9a8fbfd3-eb9e-436c-961c-b249468ee926'
        }
      }
    ]
  }));
  */
  ///////

  return (<div>
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
          {article.title}
          ({article.status})
          ({article.categories_count})
          |
          {(article.categories) ? article.categories[0].categories_id.name : ''}
          ({(article.categories) ? article.categories[0].categories_id.status : ''})
          |
          {article.categories?.map((category) => (
            <span key={category.categories_id.id} style={{paddingRight: '10px'}}>
              {category.categories_id.name}
            </span>
          ))}
        </li>
      ))}
    </ul>
  </div>);
  
}