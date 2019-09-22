import { IDockerCommand } from '../stage';


/**
 * @see https://docs.docker.com/engine/reference/builder/#label
 */
export class Label implements IDockerCommand {
    public labels : Map<string, string>;

    constructor(name: string, value: string);
    constructor(labels: [ string, string ][]);
    constructor(labels: Map<string, string>);
    constructor(nameOrLabels : string|[ string, string ][]|Map<string, string>, value?: string) {
        if(typeof nameOrLabels === 'string') {
            this.labels = new Map([
                [nameOrLabels, value!]
            ]);
        } else if (Array.isArray(nameOrLabels)) {
            this.labels = new Map(nameOrLabels);
        } else {
            this.labels = new Map(nameOrLabels.entries());
        }
    }

    toDockerCommand() {
        if(0 === this.labels.size) {
            return '';
        }
        let cmd = `LABEL `;

        let first = true;
        for(const [ name, value ] of this.labels) {
            if(!first) {
                cmd += ' \\\n    ';
            }
            cmd += `${JSON.stringify(name)}=${JSON.stringify(value)}`;
            first = false;
        }

        return cmd;
    }
}

export function label(name: string, value: string) : Label;
export function label(labels: [ string, string ][]) : Label;
export function label(labels: Map<string, string>) : Label;
export function label(nameOrLabels : string|[ string, string ][]|Map<string, string>, value?: string) {
    return new Label(nameOrLabels as any, value as any);
}