import { image } from "./image";
import { stage } from './stage';
import { run } from './commands/run';
import { from } from './commands/from';

describe('Stage', () => {
    let mathRandom : typeof Math.random;

    beforeEach(() => {
        mathRandom = Math.random;
        Math.random = () => .5;
    });

    afterEach(() => {
        Math.random = mathRandom;
    });

    it('should generate stage', () => {
        expect(stage()
            .from(image('node'))
            .commands(run('node --version')).toString()).toEqual('FROM node AS S7fffffff\n\nRUN node --version')
    });

    it('should generate stage with name', () => {
        expect(stage('stagename')
            .from(image('node'))
            .commands(run('node --version')).toString()).toEqual('FROM node AS stagename\n\nRUN node --version')
    });

    it('should return commands', () => {
        expect(stage().commands()).toEqual([]);
    });

    it('should generate stage with from', () => {
        expect(stage('stagename')
            .from(from({ getFromName() { return 'imagename' }}))
            .commands(run('node --version')).toString()).toEqual('FROM imagename AS stagename\n\nRUN node --version')
    })
})