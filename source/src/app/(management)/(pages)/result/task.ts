import { resolveResult } from './result';
import type { Result } from './result';

interface Task {
    id: string;
    title: string;
    description: string;
}

export function readTodoTasks(): Result<Task[]> {
    const tasks: Task[] = [{
        id: 'ID-1',
        title: 'TITLE-1',
        description: 'DESCRIPTION-1'
    }];

    return resolveResult(tasks);
}