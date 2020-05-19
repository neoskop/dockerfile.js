import { image } from "./image";
import { stage } from './stage';
import { run } from './commands/run';
import { arg } from './commands/arg';
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
        ).toString()).toEqual(DEFAULT_PREAMBLE + '\n\nFROM node AS S00000001\n\nRUN node --version')
    });

    it('should generate dockerfile with custom preamble', () => {
        expect(dockerfile({ preamble: '# CUSTOM PREAMBLE'}).stages(
            stage()
                .from(image('node'))
                .commands(run('node --version'))
        ).toString()).toEqual('# CUSTOM PREAMBLE\n\nFROM node AS S00000002\n\nRUN node --version')
    });

    it('should generate dockerfile with pre args', () => {
        expect(dockerfile().args(arg('FOOBAR', 'baz')).stages(
            stage()
                .from(image('node'))
                .commands(run('node --version'))
        ).toString()).toEqual(DEFAULT_PREAMBLE + '\n\nARG FOOBAR="baz"\n\nFROM node AS S00000003\n\nRUN node --version')
    })

    it('should generate dockerfile with multiple stages', () => {
        expect(dockerfile().stages(
            stage()
                .from(image('node', { tag: '8' }))
                .commands(run('node --version')),
            stage()
                .from(image('node', { tag: '10' }))
                .commands(run('node --version'))
        ).toString()).toEqual(DEFAULT_PREAMBLE + '\n\nFROM node:8 AS S00000004\n\nRUN node --version\n\nFROM node:10 AS S00000005\n\nRUN node --version')
    })

    it('should return stages', () => {
        expect(dockerfile().stages()).toEqual([]);
    });
})