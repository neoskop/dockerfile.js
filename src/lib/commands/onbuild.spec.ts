import { onbuild } from './onbuild';
import { Cmd } from './cmd';
import { Stage } from '../stage';

describe('Onbuild', () => {
    it('should render command', () => {
        expect(onbuild({ toDockerCommand() { return '<COMMAND>' } } as Cmd).toDockerCommand({} as Stage)).toEqual('ONBUILD <COMMAND>');
    });
})