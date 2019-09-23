import { Stage } from "./stage";
import { Multistage } from './multistage';

export const DEFAULT_PREAMBLE = `##############################
# Created with dockerfile.js #
#        DO NOT EDIT         #
##############################

`

export interface DockerfileBuildContext {
    dockerfile: Dockerfile;
}

export interface DockerfileOptions {
    preamble: string;
}

export class Dockerfile extends Multistage {
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

    toString() {
        const buildContext = {
            dockerfile: this
        };

        return this._options.preamble + [ ...this ].map(stage => stage.toString(buildContext)).join('\n\n');
    }
}

export function dockerfile(...args : ConstructorParameters<typeof Dockerfile>) {
    return new Dockerfile(...args);
}