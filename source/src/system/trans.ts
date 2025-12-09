import { createDirectus, rest, readTranslations } from '@directus/sdk';
import { createClient } from '@/system/client';

interface Translation {
  key: string;
  value: string;
}

export const trans = await (async (): Promise<{
    t(key: string, replacement?: Record<string, string | number>): string,
    l(): string
}> => {
    const client = createClient();
    let translations = await client.request(readTranslations({
        filter: {
            language: {
                _eq: 'en-GB'
            }
        },
        fields: ['key', 'value']
    }));

    let translation:Record<string, string> = {};

    if (translations.length === 0) {
        translation = translations?.reduce((accumulator, item) => {
            return {
                ...accumulator,
                [item.key]: item.value
            };
        }, {}) as Record<string, string>;
    }

    return {
        t: (key: string, replacement?: Record<string, string | number>): string => {
            return translation?.[key] ?? key;
        },
        l: (): string => {
            return 'en-GB';
        }
    };
})();

export const { t } = trans;