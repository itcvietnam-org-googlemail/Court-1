'use server';
 
import { cookies } from 'next/headers';
import { createDirectus, rest, authentication, staticToken, DirectusClient, RestClient, AuthenticationClient } from '@directus/sdk';
import { cookie } from '@/system/cookie';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/system/auth';
import { createClient } from '@/system/client';

export async function login(previousState: {message: string}, formData: FormData) {
    const client = createClient(true);
    const user = await auth();
    
    console.log(formData);

    if (!user) {
        const email     = (formData.get('email') ?? 'manager@example.com') as string;
        const password  = (formData.get('password') ?? 'Manager@123') as string;

        let loginSuccess = false;

        try {
            const response = await client.login({
              email,
              password
            });

            if (response.access_token) {
                loginSuccess = true;
            }

            console.log(response);
        } catch (error) {
            console.error(error);
        }

        if (loginSuccess) {
          redirect('/');
        }
    }

    return {message: 'ERROR LOGIN!'};
}

export async function logout() {
    const client = createClient(true);

    try {
      (await cookies()).delete(
        process.env.COOKIE_NAME ?? 'directus_session_token'
      );

      await client.logout();
    } catch (error) {}
}