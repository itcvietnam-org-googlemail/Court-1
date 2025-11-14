import { createDirectus, rest, readTranslations } from '@directus/sdk';

interface Translation {
  key: string;
  value: string;
}

let trans: Record<string, string> = {};

if (!Object.keys(trans).length) {

    const translationHelper = async function translationHelper(): Promise<Record<string, string>> {
        const apiUrl = 'https://cuddly-trout-4jv547pr97v43qgx-8055.app.github.dev';

        const client = createDirectus<{directus_translations: Translation[]}>(process.env.DATA_URL ?? '').with(rest());

        /*
        const translations = await client.request(readTranslations({
            filter: {
                language: {
                    _eq: 'en-GB'
                }
            },
            fields: ['key', 'value']
        }));
        */
    
        const translations = async () => {
            return await client.request(readTranslations({
                filter: {
                    language: {
                        _eq: 'en-GB'
                    }
                },
                fields: ['key', 'value']
            }));
        };

        /*
        let a = {};
        for (const t of translations) {
            a = Object.assign({},
                {
                    [t.key]: t.value
                }
            );
        }
        console.log(a);
        */
    
        const t = await translations();
        const translation = t.reduce((accumulator, item) => {
            return {
                ...accumulator,
                [item.key]: item.value
            };
        }, {});

        //console.log(translation);
        
        //trans = translation;

        return translation;
    };

    trans = await translationHelper();
    console.log('HELPER');
}

export async function translationHelperObject(): Promise<{translate(key?: string): string}> {
    return {
        translate(key?: string): string {

            const translationHelper = trans;
            
            return translationHelper[key ?? 'category'];
        }
    };
}