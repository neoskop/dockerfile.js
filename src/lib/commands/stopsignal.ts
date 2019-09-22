import { IDockerCommand } from '../stage';


/**
 * @see https://docs.docker.com/engine/reference/builder/#stopsignal
 */
export class Stopsignal implements IDockerCommand {

    constructor(public readonly signal : number|string) {

    }

    toDockerCommand() {
        return `STOPSIGNAL ${this.signal}`;
    }
}

export function stopsignal(...args : ConstructorParameters<typeof Stopsignal>) {
    return new Stopsignal(...args);
}