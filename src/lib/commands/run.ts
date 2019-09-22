import { IDockerCommand } from '../stage';


/**
 * @see https://docs.docker.com/engine/reference/builder/#run
 */
export class Run implements IDockerCommand {
    constructor(public readonly command : string | string[]) {}

    toDockerCommand() {
        let cmd = `RUN `;

        if(Array.isArray(this.command)) {
            cmd += JSON.stringify(this.command);
        } else {
            cmd += this.command.replace(/(\r?\n)/g, '\\$1');
        }

        return cmd;
    }
}

export function run(...args : ConstructorParameters<typeof Run>) {
    return new Run(...args);
}