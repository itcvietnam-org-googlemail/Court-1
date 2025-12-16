import { readTodoTasks, createTask } from './task';
import { resolveResult } from './action';

export default async function Page() {
    const tasks = await readTodoTasks();
    
    const action = await (async () => {
        return await createTask();
    })();

    const result = resolveResult(action);

    console.log(result);
    
    return (
        <div>
            <h1>Result Page</h1>
            <hr />
            <div></div>
        </div>
    );
}