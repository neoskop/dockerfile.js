import { onbuild } from './onbuild';

describe('Onbuild', () => {
    it('should render command', () => {
        expect(onbuild({ toDockerCommand() { return '<COMMAND>' } }).toDockerCommand()).toEqual('ONBUILD <COMMAND>');
    });
})