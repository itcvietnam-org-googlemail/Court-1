'use client';

import { useEffect, useState } from 'react';
import { client } from './client';
import { randomInt } from 'crypto';

export default function Socket({
    initialTasks = [{
        id: '',
        name: '',
        message: ''
    }]
}: {
    initialTasks?: {
        id: string;
        name: string;
        message: string;
    }[];
}) {
    const [status, setStatus] = useState('Đang kết nối realtime...');
    const [tasks, setTasks] = useState(initialTasks);

    useEffect(() => {
        const setup = (async () => {
            const connect = await client.connect();

            const { subscription, unsubscribe } = await client.subscribe(
                'tasks',
                {
                //event: 'create',//Bỏ qua để lắng nghe hết create, update, delete
                query: {
                    fields: ['id', 'name', 'message']
                }
            });

            for await (const item of subscription) {
                if (item.type === 'subscription' && (item.event === 'create' || item.event === 'update')) {
                    setTasks(previousTasks => [...previousTasks, item.data[0]]);
                    
                    console.log(item);
                }
            }

            unsubscribe();
        })();
    }, []);

    return (
        <div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.name}: {task.message}
                    </li>
                ))}
            </ul>
        </div>
    );
}