import { from } from './from';
import { healthcheck } from './healthcheck';
import { Cmd } from './cmd';
import { StageBuildContext } from '../stage';

describe('Healthcheck', () => {
    it('should render NONE', () => {
        expect(healthcheck('NONE').toDockerCommand({} as StageBuildContext)).toEqual('HEALTHCHECK NONE');
    });

    it('should render command', () => {
        expect(healthcheck({ toDockerCommand() { return '<COMMAND>' } } as unknown as Cmd).toDockerCommand({} as StageBuildContext)).toEqual('HEALTHCHECK <COMMAND>');
    });

    it('should render command with parameters', () => {
        expect(healthcheck({ toDockerCommand() { return '<COMMAND>' } } as unknown as Cmd, {
            interval: '10s',
            retries: 5,
            startPeriod: '30s',
            timeout: '5s'
        }).toDockerCommand({} as StageBuildContext)).toEqual('HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=5 <COMMAND>');
    });
})