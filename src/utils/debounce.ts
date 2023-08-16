export function debounce(fn: () => any, wait: number | undefined, immediate?: boolean): () => any {
    let timeout: string | number | NodeJS.Timeout | undefined;

    return function(this: unknown, ...args: []) {
        clearTimeout(timeout as string | number | NodeJS.Timeout | undefined);

        timeout = setTimeout(() => {
            timeout = undefined;

            if(!immediate) {
                fn.apply(this, args);
            }
        }, (wait as number) >= 0 && (wait as number) <= Infinity ? wait : undefined);

        if(immediate && !timeout) {
            fn.apply(this, args);
        }
    };
}