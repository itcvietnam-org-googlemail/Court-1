/*
* Import(s)
*/
import { createDirectus, rest, readSettings } from '@directus/sdk';

/*
* Export(s)
*/
export const setting: Record<string, string> = await (async (): Promise<Record<string, any>> => {
    const apiUrl = 'https://cuddly-trout-4jv547pr97v43qgx-8055.app.github.dev';

    const client = createDirectus(apiUrl).with(rest());
    const setting = await client.request(readSettings());

    return setting;
})();

//Hoac export default setting