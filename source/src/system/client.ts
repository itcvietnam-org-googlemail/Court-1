import { createDirectus, rest, DirectusClient, RestClient, AuthenticationClient, AuthenticationStorage, authentication, AuthenticationData } from '@directus/sdk';
import { cookies } from 'next/headers';

export function createClient<T extends object>(): DirectusClient<T> & RestClient<T>;

export function createClient<T extends object>(auth: boolean): DirectusClient<T> & RestClient<T> & AuthenticationClient<T>;

export function createClient<T extends object>(auth?: boolean): DirectusClient<T> & RestClient<T> | DirectusClient<T> & RestClient<T> & AuthenticationClient<T> {
    const url = process.env.DATA_URL ?? 'http://localhost:8055';

    if (auth) {
        const directus = createDirectus<T>(url).with(rest()).with(authentication(
            'cookie',
            {
                credentials: 'include',
                storage: new (class implements AuthenticationStorage {
                    async set(data: AuthenticationData | null) {
                        (await cookies()).set(
                            process.env.COOKIE_NAME ?? 'directus_session_token',
                            JSON.stringify(data),
                            {
                                sameSite: 'strict',
                                secure: true,
                                httpOnly: true
                            }
                        );
                    }

                    async get() {
                        const result = (await cookies()).get(process.env.COOKIE_NAME ?? 'directus_session_token')?.value.toString();
                        
                        if (result) {
                            return JSON.parse(result);
                        }

                        return null;
                    }
                })()
            }
        ));
        
        return directus;
    }

    return createDirectus<T>(url).with(rest());
}