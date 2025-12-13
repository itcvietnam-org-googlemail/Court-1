import Socket from './socket';
import { readItems } from '@directus/sdk';
import { createClient } from '@/system/client';

export default async function Page() {
    const client = createClient<{
        tasks: {
            id: string;
            name: string;
            message: string;
            sort: number;
        }[]
    }>(true);

    const tasks = await client.request(readItems(
        'tasks',
        {
            sort: ['sort']
        }
    ));

    return (
        <div>
            <h1>Socket</h1>
            <Socket initialTasks={tasks} />
        </div>
    );
}