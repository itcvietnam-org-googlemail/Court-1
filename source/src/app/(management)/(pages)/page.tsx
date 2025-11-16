'use server';

import { createDirectus, rest, readItems, readSingleton, readMe, createItem, DirectusClient, RestClient, AuthenticationClient, Query, authentication } from '@directus/sdk';
import { JSX } from 'react';
import { cookies } from 'next/headers';
import { storage } from '@/system/storage';
import { LocalStorage } from '@/system/local-storage';
import { cookie } from '@/system/cookie';
import Link from 'next/link';
import { useTranslation } from '@/system/translation';
import { translationHelperObject } from '@/system/translation-helper';
import { redirect } from 'next/navigation';
import { t, trans } from '@/system/trans';
import { auth } from '@/system/auth';
import { createClient } from '@/system/client';

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

  //const token = (await cookies()).get(process.env.COOKIE_NAME ?? '')?.value;
  //const token = client.getToken();
  
  const isAuth = await auth();
  if (!isAuth) {
    //redirect('/login');
  }

  ////////////////////////////////////////////////////////////
  const at = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMwZjgxZmYzLWJlNzMtNGMyZi1iNjExLTI2ZTI0ODU2MTdkOSIsInJvbGUiOiI2NWY3YThlNC1lMzJjLTQxOWUtYjRiNS1iNGQzN2M3NTc5NTYiLCJhcHBfYWNjZXNzIjpmYWxzZSwiYWRtaW5fYWNjZXNzIjpmYWxzZSwiaWF0IjoxNzYzMjk5MzI4LCJleHAiOjE3NjMzMDAyMjgsImlzcyI6ImRpcmVjdHVzIn0.UCHKQNraU2eYXH-R827WFcNlKyyAJqYEbG4x0wI5BVc';
  const rt = 'f2vkLV-ODA508AON7ciH89KZn28iIVOU-_HuAB5SWaez54IptYP2fuEl5V0KgODp';

  const client = createClient<ManySchema>(true);

  client.setToken(at);

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
  ////////////////////////////////////////////////////////////

  const cssClient = createClient<{settings: Setting}>();
  const cssSetting = await cssClient.request(readSingleton('settings', {
    fields: ['css', 'code']
  }));

  console.log(cssSetting.css);
  console.log('===');
    
  //const token = cookie.get('directus_session_token').toString();
  //client.setToken(token);
  //client.setToken(storage.getItem('access_token'));

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

  return (<div>
    <h4 style={cssSetting.css.headdingTitle}>{translation.title_have_contains_4_5}</h4>
    <h5></h5>
    <h6 style={cssSetting.css.headding.title}>{translate('title')}</h6>
    <h6 style={cssSetting.css.hasNotStyle}>Trans: {translate('title_have_contains_4_5')}</h6>
    <h6 style={cssSetting.css.hasNotStylesheet?.no}>Trans: {translate('title_have_contains_4_5')}</h6>
    <h6>T: {t('title')}</h6>
    <h6>Trans: {trans.t('title_have_contains_4_5')}</h6>
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