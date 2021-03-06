import { Cmd } from './cmd';
import { IDockerCommand, StageBuildContext } from '../stage';

export interface IHealthcheckOptions {
    interval?: string;
    timeout?: string;
    startPeriod?: string;
    retries?: number;
}

export class Healthcheck implements IDockerCommand {

    constructor(public readonly command: Cmd | 'NONE',
        public readonly options: IHealthcheckOptions = {}) {

    }

    protected getParameters() {
        let parameters = '';
        if (this.options.interval) {
            parameters += ` --interval=${this.options.interval}`;
        }
        if (this.options.timeout) {
            parameters += ` --timeout=${this.options.timeout}`;
        }
        if (this.options.startPeriod) {
            parameters += ` --start-period=${this.options.startPeriod}`;
        }
        if (this.options.retries) {
            parameters += ` --retries=${this.options.retries}`;
        }
        return parameters
    }

    toDockerCommand(context : StageBuildContext) {
        if (this.command === 'NONE') {
            return 'HEALTHCHECK NONE';
        }
        return `HEALTHCHECK${this.getParameters()} ${this.command.toDockerCommand(context)}`;
    }
}

export function healthcheck(...args: ConstructorParameters<typeof Healthcheck>) {
    return new Healthcheck(...args);
}