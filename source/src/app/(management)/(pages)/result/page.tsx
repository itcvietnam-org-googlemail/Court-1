import { readTodoTasks } from './task';
import type { Result } from './result';

export default function Page() {
    const todoTasks = readTodoTasks().toData();
    const result = readTodoTasks().toResult();

    console.log(todoTasks);
    console.log(result);

    return (
        <div>
            <h1>Result Page</h1>
            <hr />
            <div></div>
        </div>
    );
}