import { IDockerCommand, StageBuildContext } from '../stage';


/**
 * @see https://docs.docker.com/engine/reference/builder/#cmd
 */
export class Cmd implements IDockerCommand {
    constructor(public readonly command : string | string[]) {}

    toDockerCommand(_context : StageBuildContext) {
        let cmd = `CMD `;

        if(Array.isArray(this.command)) {
            cmd += JSON.stringify(this.command);
        } else {
            cmd += this.command.replace(/(\r?\n)/g, '\\$1');;
        }

        return cmd;
    }
}

export function cmd(...args : ConstructorParameters<typeof Cmd>) {
    return new Cmd(...args);
}