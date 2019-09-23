import { Stage } from './stage';

export class Multistage {
    protected _stages : (Stage|Multistage)[] = [];

    stages() : (Stage|Multistage)[];
    stages(stage: Stage|Multistage, ...stages : (Stage|Multistage)[]) : this;
    stages(stage?: Stage|Multistage, ...stages : (Stage|Multistage)[]) : this | (Stage|Multistage)[] {
        if(stage) {
            this._stages.push(stage, ...stages);
            return this;
        }
        return this._stages;
    }

    getStage(name: string) {
        return [ ...this ].find(s => s.getName() === name);
    }

    *[Symbol.iterator](): Iterator<Stage> {
        for(const stage of this.stages()) {
            if(stage instanceof Multistage) {
                yield* stage;
            } else {
                yield stage;
            }
        }
    }
}

export function multistage(...args : ConstructorParameters<typeof Multistage>) {
    return new Multistage(...args);
}