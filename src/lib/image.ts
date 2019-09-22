import { Fromable } from './stage';

export interface IImageOptions {
    digest?: string;
    tag?: string;
}

export class Image implements Fromable {
    constructor(protected readonly image : string,
        protected readonly options : IImageOptions = {}) {}

    getFromName() {
        let name = this.image;

        if(this.options.tag) {
            name += `:${this.options.tag}`;
        } else if(this.options.digest) {
            name += `@${this.options.digest}`;
        }

        return name;
    }
}

export function image(...args : ConstructorParameters<typeof Image>) {
    return new Image(...args);
}