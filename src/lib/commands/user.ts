import { IDockerCommand } from '../stage';


/**
 * @see https://docs.docker.com/engine/reference/builder/#user
 */
export class User implements IDockerCommand {

    constructor(public readonly user : string|number,
                public readonly group? : string|number) {}

    toDockerCommand() {
        let cmd = `USER ${this.user}`;

        if(this.group) {
            cmd += `:${this.group}`;
        }
        
        return cmd;
    }
}

export function user(...args : ConstructorParameters<typeof User>) {
    return new User(...args);
}