import { cookies } from 'next/headers';

export const cookie = {
    async set(key: string, value: string) {
        (await cookies()).set(key, value, { sameSite: 'strict', path: '/', secure: true });
    },
    async get(key: string) {
        return (await cookies()).get(key)?.value;
    }
};