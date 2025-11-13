import { createDirectus, rest, readItems, authentication } from '@directus/sdk';
import { cookies } from 'next/headers';
import { useTranslation } from '@/system/translation';

interface Category {
  id: string;
  name: string;
  status: string;
}

export default async function Category() {
  const translation = await useTranslation();

  const apiUrl = 'https://cuddly-trout-4jv547pr97v43qgx-8055.app.github.dev';
  const client = createDirectus<{categories: Category[]}>(apiUrl).with(rest()).with(authentication('json', {
    credentials: 'include'
  }));

    const token = (await cookies()).get("directus_session_token")?.value;

    client.setToken(token ?? '');

    const categories = await client.request(readItems('categories', {
      filter: {
        status: {
          _in: ['published']
        }
      },
      fields: [
        '*',
      ],
      sort: ['name']
    }));

  return (<div>
    <h4>{translation.category}</h4>
    <select>
      {categories?.map((category) => (
        <option key={category.id} value={category.id}>{category.name}</option>
      ))}
    </select>
  </div>);
  
}