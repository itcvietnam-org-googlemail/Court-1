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

    const token = (await cookies()).get("directus_session_token")?.value;
    //const token = cookie.get('directus_session_token').toString();

    return (
        <section>
            <h1>LOGIN</h1>
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
        </section>
    );
}