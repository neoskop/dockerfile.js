import { IDockerCommand } from "../interfaces/docker-command";

export abstract class Variable implements IDockerCommand {
    protected readonly abstract cmd : string;

    constructor(public readonly name : string,
                public readonly defaultValue?: string) {}

    toString() {
        return `\${${this.name}}`;
    }

    toDockerCommand() {
        let cmd = `${this.cmd} ${this.name}`;

        if(this.defaultValue) {
            cmd += `=${JSON.stringify(this.defaultValue)}`;
        }

        return cmd;
    }
}