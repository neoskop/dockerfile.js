import { run } from './run';

describe('Run', () => {
    it('should render command as string', () => {
        expect(run('foobar').toDockerCommand()).toEqual(`RUN foobar`);
    });

    it('should render command as string with nl', () => {
        expect(run('foo\nbar').toDockerCommand()).toEqual(`RUN foo\\\nbar`);
    });

    it('should render command as array', () => {
        expect(run([ 'foo', 'bar' ]).toDockerCommand()).toEqual(`RUN ["foo","bar"]`);
    });
})