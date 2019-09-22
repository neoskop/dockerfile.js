import { Stage, IDockerCommand, Fromable } from '../stage';


/**
 * @see https://docs.docker.com/engine/reference/builder/#from
 */
export class From implements IDockerCommand {
    
    constructor(protected readonly image : string|Fromable) {
    }

    toDockerCommand(stage : Stage) {
        return `FROM ${typeof this.image === 'string' ? this.image :this.image.getFromName() } AS ${stage.getName()}`;
    }
}

export function from(...args : ConstructorParameters<typeof From>) {
    return new From(...args);
}