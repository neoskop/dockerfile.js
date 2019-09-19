import { IDockerCommand } from '../interfaces/docker-command';
import { Fromable } from '../interfaces/fromable';


/**
 * @see https://docs.docker.com/engine/reference/builder/#from
 */
export class From implements IDockerCommand {
    
    constructor(protected readonly image : string|Fromable) {
    }

    toDockerCommand(alias?: string) {
        if(alias) {
            return `FROM ${typeof this.image === 'string' ? this.image :this.image.getFromName() } AS ${alias}`;
        }

        return `FROM ${typeof this.image === 'string' ? this.image :this.image.getFromName() }`;
    }
}

export function from(...args : ConstructorParameters<typeof From>) {
    return new From(...args);
}