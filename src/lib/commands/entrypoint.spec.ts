import { entrypoint } from './entrypoint';

describe('Entrypoint', () => {
    it('should render command as string', () => {
        expect(entrypoint('foobar').toDockerCommand()).toEqual(`ENTRYPOINT foobar`);
    });

    it('should render command as string with nl', () => {
        expect(entrypoint('foo\nbar').toDockerCommand()).toEqual(`ENTRYPOINT foo\\\nbar`);
    });

    it('should render command as array', () => {
        expect(entrypoint([ 'foo', 'bar' ]).toDockerCommand()).toEqual(`ENTRYPOINT ["foo","bar"]`);
    });
})