'use server';

import { createDirectus, rest, readItems, readSingleton, createItem , Query, authentication } from '@directus/sdk';
import { JSX } from 'react';
import { cookies } from 'next/headers';
import { storage } from '@/system/storage';
import { LocalStorage } from '@/system/local-storage';
import { cookie } from '@/system/cookie';
import Link from 'next/link';
import { useTranslation } from '@/system/translation';
import { translationHelperObject } from '@/system/translation-helper';
import { redirect } from 'next/navigation';

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
  categories_count: number;
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

interface Setting {
  css: any;
  code: string;
}

export default async function Page() {
  const translation = await useTranslation();
  //const thelper = await translationHelper();
  const { translate } = await translationHelperObject();
  //const translationHelperObj = await translationHelperObject();
  //console.log(translationHelperObj.translate('title'));

  const trans: string = 'a';

  const query: Query<ManySchema, Article> = {
    limit: 20,
    offset: 0,
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
  };
  
  const localStorage = new LocalStorage();

  const cssClient = createDirectus<{settings: Setting}>(process.env.DATA_URL ?? '').with(rest());
  const cssSetting = await cssClient.request(readSingleton('settings', {
    fields: ['css', 'code']
  }));

  console.log(cssSetting.css);
  console.log('===');

  const client = createDirectus<ManySchema>(process.env.DATA_URL ?? '').with(rest()).with(authentication('json', {
    credentials: 'include'
  }));

    const token = (await cookies()).get(process.env.COOKIE_NAME ?? '')?.value;
    
    if (!token) {
      redirect('/login');
    }
    
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

    //console.log(articles);
  //} catch (error) {}

  ///////
  //const client = createDirectus(process.env.DATA_URL ?? '').with(rest());
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
    <h4 style={cssSetting.css.headdingTitle}>{translation.title_have_contains_4_5}</h4>
    <h5></h5>
    <h6 style={cssSetting.css.headding.title}>{translate('title')}</h6>
    <h6 style={cssSetting.css.hasNotStyle}>Trans: {translate('title_have_contains_4_5')}</h6>
    <h6 style={cssSetting.css.hasNotStylesheet?.no}>Trans: {translate('title_have_contains_4_5')}</h6>
    <h6>Trans: {translate('title')}</h6>
    <h6>Trans: {translate('category')}</h6>
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
          {translation.title}: {article.title}
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