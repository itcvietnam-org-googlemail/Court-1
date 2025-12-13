import { realtime, rest, createDirectus } from '@directus/sdk';

export const client = (() => {
    const url = process.env.NEXT_PUBLIC_DATA_URL ?? 'https://cuddly-trout-4jv547pr97v43qgx-8055.app.github.dev';

    return createDirectus<{tasks: {
        id: string;
        name: string;
        message: string;
    }}>(url).with(rest()).with(realtime());
})();