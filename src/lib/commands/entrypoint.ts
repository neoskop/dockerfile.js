import { IDockerCommand } from "../interfaces/docker-command";

/**
 * @see https://docs.docker.com/engine/reference/builder/#entrypoint
 */
export class Entrypoint implements IDockerCommand {
    constructor(public readonly command : string | string[]) {}

    toDockerCommand() {
        let cmd = `ENTRYPOINT `;

        if(Array.isArray(this.command)) {
            cmd += JSON.stringify(this.command);
        } else {
            cmd += this.command.replace(/(\r?\n)/g, '\\$1');;
        }

        return cmd;
    }
}

export function entrypoint(...args : ConstructorParameters<typeof Entrypoint>) {
    return new Entrypoint(...args);
}