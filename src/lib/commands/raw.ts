import { IDockerCommand } from '../interfaces/docker-command';

export class Raw implements IDockerCommand {
    constructor(protected raw : string) {}

    toDockerCommand() {
        return this.raw;
    }
}

export function raw(...args : ConstructorParameters<typeof Raw>) {
    return new Raw(...args);
}