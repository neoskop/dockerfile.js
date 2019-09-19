import { IDockerCommand } from "../interfaces/docker-command";


/**
 * @see https://docs.docker.com/engine/reference/builder/#onbuild
 */
export class Onbuild implements IDockerCommand {

    constructor(public readonly command : IDockerCommand) {

    }

    toDockerCommand() {
        return `ONBUILD ${this.command.toDockerCommand()}`;
    }
}

export function onbuild(...args : ConstructorParameters<typeof Onbuild>) {
    return new Onbuild(...args);
}