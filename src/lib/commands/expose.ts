import { IDockerCommand } from "../interfaces/docker-command";

export type ExposeProtocol = 'tcp' | 'udp';

/**
 * @see https://docs.docker.com/engine/reference/builder/#expose
 */
export class Expose implements IDockerCommand {
    constructor(public readonly port : number,
                public readonly protocol? : ExposeProtocol) {}

    toDockerCommand() {
        let cmd = `EXPOSE ${this.port}`;

        if(this.protocol) {
            cmd += `/${this.protocol}`;
        }

        return cmd;
    }
}

export function expose(...args : ConstructorParameters<typeof Expose>) {
    return new Expose(...args);
}