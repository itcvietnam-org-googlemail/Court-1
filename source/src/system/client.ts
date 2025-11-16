import { createDirectus, rest, DirectusClient, RestClient, AuthenticationClient, AuthenticationStorage, authentication } from '@directus/sdk';

export function createClient<T extends object>(): DirectusClient<T> & RestClient<T>;

export function createClient<T extends object>(auth: boolean): DirectusClient<T> & RestClient<T> & AuthenticationClient<T>;

export function createClient<T extends object>(auth?: boolean): DirectusClient<T> & RestClient<T> | DirectusClient<T> & RestClient<T> & AuthenticationClient<T> {
    const url = process.env.DATA_URL ?? 'http://localhost:8055';

    if (auth) {
        const directus = createDirectus<T>(url).with(rest()).with(authentication(
            'json',
            {
                credentials: 'include'
            }
        ));
        return directus;
    }

    return createDirectus<T>(url).with(rest());
}