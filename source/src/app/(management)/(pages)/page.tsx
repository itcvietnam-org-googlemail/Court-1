'use server';

import { createDirectus, rest, readItems, createItem , Query, authentication } from '@directus/sdk';
import { JSX } from 'react';
import { cookies } from 'next/headers';
import { storage } from '@/system/storage';
import { LocalStorage } from '@/system/local-storage';
import { cookie } from '@/system/cookie';
import Link from 'next/link';

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
  
  const localStorage = new LocalStorage();

  const client = createDirectus<ManySchema>(apiUrl).with(rest()).with(authentication('json', {
        credentials: 'include'
    }));

    const token = (await cookies()).get("directus_session_token")?.value;
    //const token = cookie.get('directus_session_token').toString();
    client.setToken(token ?? '');
  //client.setToken(storage.getItem('access_token'));
  
  //try {
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
  //} catch (error) {}

  ///////
  //const client = createDirectus(apiUrl).with(rest());
  /*
  const result = await client.request(createItem('articles', {
    title: 'Article 4.6',
    status: 'draft',
    categories: [
      {
        categories_id: {
          id: '7d1fe309-59f6-440e-878d-e92f037f4ae8'
        }
      }
    ]
  }));
  console.log(result);
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
    <Link href="/login">Login Page</Link>
  </div>);
  
}