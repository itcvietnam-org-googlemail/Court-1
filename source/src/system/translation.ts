import { createDirectus, rest, readTranslations } from '@directus/sdk';

interface Translation {
  key: string;
  value: string;
}

export async function useTranslation(): Promise<Record<string, string>> {
    const apiUrl = 'https://cuddly-trout-4jv547pr97v43qgx-8055.app.github.dev';

    const client = createDirectus<{directus_translations: Translation[]}>(apiUrl).with(rest());
    const translations = await client.request(readTranslations({
        filter: {
            language: {
                _eq: 'en-GB'
            }
        },
        fields: ['key', 'value']
    }));
    
    /*
    const translations = async () => {
        return await client.request(readTranslations({
            filter: {
                language: {
                    _eq: 'en-US'
                }
            },
            fields: ['key', 'value']
        }));
    };
    */

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

    const translation = translations.reduce((accumulator, item) => {
        return {
            ...accumulator,
            [item.key]: item.value
        };
    }, {});

    //console.log(translation);

    return translation;
};