import { cmd } from './cmd';
import { StageBuildContext } from '../stage';

describe('Cmd', () => {
    it('should render command as string', () => {
        expect(cmd('foobar').toDockerCommand({} as StageBuildContext)).toEqual(`CMD foobar`);
    });

    it('should render command as string with nl', () => {
        expect(cmd('foo\nbar').toDockerCommand({} as StageBuildContext)).toEqual(`CMD foo\\\nbar`);
    });

    it('should render command as array', () => {
        expect(cmd([ 'foo', 'bar' ]).toDockerCommand({} as StageBuildContext)).toEqual(`CMD ["foo","bar"]`);
    });
})