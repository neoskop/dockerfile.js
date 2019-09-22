import { IDockerCommand, Stage } from '../stage';
import { Cmd } from './cmd';


/**
 * @see https://docs.docker.com/engine/reference/builder/#onbuild
 */
export class Onbuild implements IDockerCommand {

    constructor(public readonly command : Cmd) {

    }

    toDockerCommand(stage: Stage) {
        return `ONBUILD ${this.command.toDockerCommand(stage)}`;
    }
}

export function onbuild(...args : ConstructorParameters<typeof Onbuild>) {
    return new Onbuild(...args);
}