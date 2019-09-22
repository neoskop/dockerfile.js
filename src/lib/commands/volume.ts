import { IDockerCommand } from '../stage';


/**
 * @see https://docs.docker.com/engine/reference/builder/#volume
 */
export class Volume implements IDockerCommand {

    constructor(public readonly path : string) {

    }

    toDockerCommand() {
        return `VOLUME ${this.path}`;
    }
}

export function volume(...args : ConstructorParameters<typeof Volume>) {
    return new Volume(...args);
}