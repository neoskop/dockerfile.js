import { cmd } from './cmd';

describe('Cmd', () => {
    it('should render command as string', () => {
        expect(cmd('foobar').toDockerCommand()).toEqual(`CMD foobar`);
    });

    it('should render command as string with nl', () => {
        expect(cmd('foo\nbar').toDockerCommand()).toEqual(`CMD foo\\\nbar`);
    });

    it('should render command as array', () => {
        expect(cmd([ 'foo', 'bar' ]).toDockerCommand()).toEqual(`CMD ["foo","bar"]`);
    });
})