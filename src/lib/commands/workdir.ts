import { IDockerCommand } from "../interfaces/docker-command";


/**
 * @see https://docs.docker.com/engine/reference/builder/#workdir
 */
export class Workdir implements IDockerCommand {

    constructor(public readonly path : string) {

    }

    toDockerCommand() {
        return `WORKDIR ${this.path}`;
    }
}

export function workdir(...args : ConstructorParameters<typeof Workdir>) {
    return new Workdir(...args);
}