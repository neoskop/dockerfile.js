import { IDockerCommand, StageBuildContext } from '../stage';
import { Cmd } from './cmd';


/**
 * @see https://docs.docker.com/engine/reference/builder/#onbuild
 */
export class Onbuild implements IDockerCommand {

    constructor(public readonly command : Cmd) {

    }

    toDockerCommand(context : StageBuildContext) {
        return `ONBUILD ${this.command.toDockerCommand(context)}`;
    }
}

export function onbuild(...args : ConstructorParameters<typeof Onbuild>) {
    return new Onbuild(...args);
}