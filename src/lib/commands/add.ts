import { Adding } from './adding';



/**
 * @see https://docs.docker.com/engine/reference/builder/#add
 */
export class Add extends Adding {
    protected readonly cmd = 'ADD';
}

export function add(...args : ConstructorParameters<typeof Add>) {
    return new Add(...args);
}