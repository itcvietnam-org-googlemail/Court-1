/*
* Import
*/
import { cookies } from 'next/headers';
import { createDirectus, rest, authentication } from '@directus/sdk';
import { storage } from '@/system/storage';
import { login, logout } from './actions';
import { cookie } from '@/system/cookie';
import LikeButton from './button';
import LoginButton from './login-button';
import Category from './category';
import { translationHelperObject } from '@/system/translation-helper';
import Link from 'next/link';
import { setting } from '@/system/setting';

/*
* Interfaces
* Functions
*/

/*
* Export
*/
export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
    const { id } = await params;

    const { translate } = await translationHelperObject();

    const token = (await cookies()).get("directus_session_token")?.value;
    //const token = cookie.get('directus_session_token').toString();

    return (
        <section>
            <h1>LOGIN</h1>
            <h5>Trans: {translate('title')}</h5>
            <h5>Trans: {translate('category')}</h5>
            <hr />
            <p>Setting: {setting.project_name} ({setting.default_language})</p>
            <hr />
            <LikeButton likes={12} token={token} />
            <hr />
            <form>
              <input type="text" name="email" defaultValue="manager@example.com" />
              <input type="text" name="password" defaultValue="Manager@123" />
              <LoginButton pendingText="Logining...">Login Button</LoginButton>
          </form>
            <hr />
            <form action={logout}>
                <button type="submit">Logout</button>
            </form>
            <Link href="/">Home Page</Link>
        </section>
    );
}