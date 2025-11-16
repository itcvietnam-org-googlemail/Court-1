/*
* Import(s)
*/
import { createDirectus, rest, readSettings } from '@directus/sdk';
import { createClient } from '@/system/client';

/*
* Export(s)
*/
export const setting: Record<string, string> = await (async (): Promise<Record<string, any>> => {
    const client = createClient();
    const setting = await client.request(readSettings());

    return setting;
})();