import { Variable } from "./variable";

/**
 * @see https://docs.docker.com/engine/reference/builder/#env
 */
export class Env extends Variable {
    protected readonly cmd = 'ENV';

    constructor(name: string, defaultValue: string) {
        super(name, defaultValue);
    }
}

export function env(...args : ConstructorParameters<typeof Env>) {
    return new Env(...args);
}