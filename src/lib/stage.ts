import { From } from './commands/from';
import { Dockerfile, DockerfileBuildContext } from './dockerfile';

export interface StageBuildContext extends DockerfileBuildContext {
    stage: Stage;
}

export interface IDockerCommand {
    toDockerCommand(context : StageBuildContext): string;
}

export interface Fromable {
    getFromName(): string;
}


export class Stage implements Fromable {
    protected _from?: From;
    protected _commands : IDockerCommand[] = [];

    constructor(protected name: string = 'S' + (Math.random() * 0xFFFFFFFF >>> 0).toString(16).padStart(8, '0')) {

    }

    getName() {
        return this.name;
    }

    getFromName() {
        return this.name;
    }

    from() : From|undefined;
    from(from : From|Fromable) : this;
    from(from?: From|Fromable) : this | From | undefined {
        if(from) {
            this._from = from instanceof From ? from : new From(from);
            return this;
        }
        return this._from;
    }

    commands() : IDockerCommand[];
    commands(cmd: IDockerCommand, ...commands : IDockerCommand[]) : this;
    commands(cmd?: IDockerCommand, ...commands : IDockerCommand[]) : this | IDockerCommand[] {
        if(cmd) {
            this._commands.push(cmd, ...commands);
            return this;
        }
        return this._commands;
    }

    toString(context : DockerfileBuildContext) {
        const buildContext : StageBuildContext = {
            ...context,
            stage: this
        }

        return [ this.from()!.toDockerCommand(buildContext), '', ...this._commands.map(cmd => cmd.toDockerCommand(buildContext) ) ].join('\n');
    }
}

export function stage(...args : ConstructorParameters<typeof Stage>) {
    return new Stage(...args);
}