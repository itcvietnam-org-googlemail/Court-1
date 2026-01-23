import { randomInt } from 'crypto';
import { cookies, headers } from 'next/headers';

async function get(token?: boolean): Promise<string> {
    if (token) {
        (await cookies()).set('a', 'a');

        return 'Has cookies';
    }

    return 'No cookies';
}

export default async function Page() {
    'use cache';

    //Get
    const result = get();

    //Return
    return (
        <div>
            <h1>Page::Cache</h1>
            <p>{result}</p>
        </div>
    );
}