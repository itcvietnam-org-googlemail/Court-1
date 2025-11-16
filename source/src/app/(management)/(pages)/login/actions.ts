'use server';
 
import { cookies } from 'next/headers';
import { createDirectus, rest, authentication, staticToken, DirectusClient, RestClient, AuthenticationClient } from '@directus/sdk';
import { cookie } from '@/system/cookie';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/system/auth';
import { createClient } from '@/system/client';

export async function login(previousState: {message: string}, formData: FormData) {
   const directus = createClient(true);


    //const token = (await cookies()).get("directus_session_token")?.value;
    //const token = cookie.get('directus_session_token').toString();
    const isAuth = await auth();
    console.log(isAuth);

    if (!isAuth) {
        const email     = (formData.get('email') ?? 'manager@example.com') as string;
        const password  = (formData.get('password') ?? 'Manager@123') as string;

        let loginSuccess = false;

        try {
            const response = await directus.login(
                {email, password},
                {}
            );

            //storage.setItem('access_token', response.access_token ?? '');
            if (response.access_token) {
                //(await cookies()).set('directus_session_token', response.access_token ?? '', { sameSite: 'strict', path: '/', secure: true });
                //cookie.set('directus_session_token', response.access_token ?? '');

                loginSuccess = true;
            } else {
                
            }

            console.log(response);
        } catch (error) {
            console.error(error);
            //return NextResponse.json({ error: "Login failed" }, { status: 500 });
        }

        if (loginSuccess) {
          redirect('/');
        } else {
          //return {message: 'ERROR LOGIN!'};
        }
    }

    return {message: 'ERROR LOGIN!'};
    //return {message: 'OK'};
}

export async function logout() {
  const directus = createClient(true);

    //const token = directus.getToken();
    //console.log(token);
    //await directus.logout();

    const token = (await cookies()).get("directus_session_token")?.value;
    //const token = cookie.get('directus_session_token').toString();

    if (token) {
      try {
        (await cookies()).set('directus_session_token', '', {});
        //cookie.set('directus_session_token', '');
        await directus.logout();
      } catch (error) {}
    }
}