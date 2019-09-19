import { Variable } from "./variable";


/**
 * @see https://docs.docker.com/engine/reference/builder/#arg
 */
export class Arg extends Variable {
    protected readonly cmd = 'ARG';
}

export function arg(...args : ConstructorParameters<typeof Arg>) {
    return new Arg(...args);
}