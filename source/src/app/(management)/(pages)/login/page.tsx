/*
* Import
*/
import { cookies } from 'next/headers';
import { createDirectus, rest, authentication } from '@directus/sdk';
import { storage } from '@/system/storage';
import { login, logout } from './actions';
import { cookie } from '@/system/cookie';
import LikeButton from './button';
import LoginForm from './login-form';

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
            <LoginForm />
            <hr />
            <form action={logout}>
                <button type="submit">Logout</button>
            </form>
        </section>
    );
}