import { Cmd } from './cmd';
import { onbuild } from './onbuild';
import { StageBuildContext } from '../stage';

describe('Onbuild', () => {
    it('should render command', () => {
        expect(onbuild({ toDockerCommand() { return '<COMMAND>' } } as unknown as Cmd).toDockerCommand({} as StageBuildContext)).toEqual('ONBUILD <COMMAND>');
    });
})