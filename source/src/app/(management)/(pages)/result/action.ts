export interface Result<T> {
    status: number;
    data: T | null;
    error: {
        messages: string[];
        exceptions: T;
    } | null;
};

export function resolveResult<T>(result: T): Result<T> {
    if (result instanceof Error) {
        return {
            status: 400,
            data: null,
            error: {
                messages: [],
                exceptions: result
            }
        };
    } else {
        return {
            status: 200,
            data: result,
            error: null
        };
    }
}