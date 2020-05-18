import { Multistage } from './multistage';
import { Arg } from "./commands/arg";

export const DEFAULT_PREAMBLE = `##############################
# Created with dockerfile.js #
#        DO NOT EDIT         #
##############################`

export interface DockerfileBuildContext {
    dockerfile: Dockerfile;
}

export interface DockerfileOptions {
    preamble: string;
}

export class Dockerfile extends Multistage {
    protected _args: Arg[] = [];
    protected _options : DockerfileOptions;

    constructor(options : Partial<DockerfileOptions> = {}) {
        super();
        this._options = {
            ...{
                preamble: DEFAULT_PREAMBLE
            },
            ...options
        };
    }

    args(): Arg[];
    args(arg: Arg, ...args: Arg[]): this;
    args(arg?: Arg, ...args: Arg[]): this | Arg[] {
        if(arg) {
            this._args.push(arg, ...args);
            return this;
        }

        return this._args;
    }

    toString() {
        const buildContext = {
            dockerfile: this
        };

        return [
            this._options.preamble,
            this._args.map(arg => arg.toDockerCommand()).join('\n'),
            ...this.stages().map(stage => stage.toString(buildContext))
        ].filter(Boolean).join('\n\n')
    }
}

export function dockerfile(...args : ConstructorParameters<typeof Dockerfile>) {
    return new Dockerfile(...args);
}