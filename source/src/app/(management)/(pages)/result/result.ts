export interface Result<T> {
    toData: () => T;
    toResult: () => {
        status: number;
        data: T | null;
        error: {} | null;
    };
};

export function resolveResult<T>(result: T): Result<T> {
    return {
        toData: () => result,
        toResult: () => {
            return {
                status: 200,
                data: result,
                error: null
            };
        }
    };
}