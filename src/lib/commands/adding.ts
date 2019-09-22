import { IDockerCommand } from '../stage';

export interface IAddingOptions {
    chown?: [string | number, string | number] | string | number;
}

export abstract class Adding<O extends IAddingOptions = IAddingOptions> implements IDockerCommand {
    protected readonly abstract cmd: string;

    constructor(public readonly src: string | string[],
        public readonly dest: string = './',
        public readonly options?: O) {

    }

    protected getParameters() {
        if (this.options && this.options.chown) {
            if (Array.isArray(this.options.chown)) {
                return ` --chown=${this.options.chown[0]}:${this.options.chown[1]}`;
            } else {
                return ` --chown=${this.options.chown}`;
            }
        }
        return ''
    }

    toDockerCommand() {
        return `${this.cmd}${this.getParameters()} ${JSON.stringify(Array.isArray(this.src) ? [...this.src, this.dest] : [this.src, this.dest])}`
    }
}