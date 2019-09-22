import { Fromable } from '../stage';
import { Adding, IAddingOptions } from './adding';

export interface ICopyOptions extends IAddingOptions {
    from?: string|Fromable;
}

/**
 * @see https://docs.docker.com/engine/reference/builder/#copy
 */
export class Copy extends Adding<ICopyOptions> {
    protected readonly cmd = 'COPY';

    getParameters() {
        if(this.options && this.options.from) {
            return `${super.getParameters()} --from=${typeof this.options.from === 'string' ? this.options.from : this.options.from.getFromName()}`;
        }
        return super.getParameters();
    }
}

export function copy(...args : ConstructorParameters<typeof Copy>) {
    return new Copy(...args);
}