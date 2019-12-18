import { image } from "./image";
import { stage } from './stage';
import { run } from './commands/run';
import { dockerfile, DEFAULT_PREAMBLE } from './dockerfile';

describe('Dockerfile', () => {
    let mathRandom : typeof Math.random;

    beforeEach(() => {
        mathRandom = Math.random;
        Math.random = () => .5;
    });

    afterEach(() => {
        Math.random = mathRandom;
    });

    it('should generate dockerfile with default preamble', () => {
        expect(dockerfile().stages(
            stage()
                .from(image('node'))
                .commands(run('node --version'))
        ).toString()).toEqual(DEFAULT_PREAMBLE + 'FROM node AS S00000001\n\nRUN node --version')
    });

    it('should generate dockerfile with custom preamble', () => {
        expect(dockerfile({ preamble: '# CUSTOM PREAMBLE\n'}).stages(
            stage()
                .from(image('node'))
                .commands(run('node --version'))
        ).toString()).toEqual('# CUSTOM PREAMBLE\nFROM node AS S00000002\n\nRUN node --version')
    });

    it('should return stages', () => {
        expect(dockerfile().stages()).toEqual([]);
    });
})