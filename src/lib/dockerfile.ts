import { Stage } from "./stage";

export const DEFAULT_PREAMBLE = `******************************
* Created with dockerfile.js *
*        DO NOT EDIT         *
******************************

`

export interface DockerfileOptions {
    preamble: string;
}

export class Dockerfile {
    protected _stages : Stage[] = [];
    protected _options : DockerfileOptions;

    constructor(options : Partial<DockerfileOptions> = {}) {
        this._options = {
            ...{
                preamble: DEFAULT_PREAMBLE
            },
            ...options
        };
    }

    stages() : Stage[];
    stages(stage: Stage, ...stages : Stage[]) : this;
    stages(stage?: Stage, ...stages : Stage[]) : this | Stage[] {
        if(stage) {
            this._stages.push(stage, ...stages);
            return this;
        }
        return this._stages;
    }

    toString() {
        return this._options.preamble + this._stages.map(stage => stage.toString()).join('\n\n');
    }
}

export function dockerfile(...args : ConstructorParameters<typeof Dockerfile>) {
    return new Dockerfile(...args);
}