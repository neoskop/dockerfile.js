import { raw } from './raw';

describe('Raw', () => {
    it('should render raw command', () => {
        expect(raw('RAW DOCKER COMMAND').toDockerCommand()).toEqual('RAW DOCKER COMMAND');
    });
})