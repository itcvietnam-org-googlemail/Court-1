import { resolveResult } from './action';
import { ensureError } from './utility';

interface Task {
    id: string;
    title: string;
    description: string;
}

export async function readTodoTasks(): Promise<Task[]> {
    try {
        const tasks: Task[] = [{
            id: 'ID-1',
            title: 'TITLE-1',
            description: 'DESCRIPTION-1'
        }];

        return tasks;
    } catch (error) {
        return [];
    }
}

export async function createTask(): Promise<Task | Error> {
    try {
        const task: Task = {
            id: 'ID-1',
            title: 'TITLE-1',
            description: 'DESCRIPTION-1'
        };
        
        return task;
    } catch (error) {
        return ensureError(error);
    }
}