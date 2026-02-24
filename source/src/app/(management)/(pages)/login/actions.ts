'use server';
 
import { cookies, headers } from 'next/headers';
import { createDirectus, rest, authentication, staticToken, DirectusClient, RestClient, AuthenticationClient } from '@directus/sdk';
import { cookie } from '@/system/cookie';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/system/auth';
import { createClient } from '@/system/client';
import { getFormStore } from './store';
import { refresh, revalidatePath } from 'next/cache';

export async function login(previousState: any, formData: FormData): Promise<any> {
    const client = createClient(true);
    const user = await auth();
    
    console.log((await headers()).get('x-app'));

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

    return {message: 'ERROR LOGIN!', data: Object.fromEntries(formData.entries())};
}

export async function sigin(formData: FormData): Promise<any> {
    const client = createClient(true);
    
    if (formData) {
        const email     = (formData.get('email') ?? 'signin@example.com') as string;
        const password  = (formData.get('password') ?? 'Sigin@123') as string;

        let loginSuccess = false;

        try {
            if (email === 'email@example.com') {
                loginSuccess = true;
            }
        } catch (error) {
            console.error(error);
        }

        if (loginSuccess) {
          redirect('/');
        }
    }
    
    return {message: 'ERROR SIGIN!', data: Object.fromEntries(formData.entries())};
}

export async function logout() {
    const client = createClient(true);

    try {
      (await cookies()).delete(
        process.env.COOKIE_ACCESS_TOKEN ?? 'directus_session_token'
      );

      await client.logout();
    } catch (error) {}
}

export async function placeholder(formData: FormData) {}