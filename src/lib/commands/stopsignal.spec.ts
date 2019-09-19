import { stopsignal } from './stopsignal';

describe('Stopsignal', () => {
    it('should render number', () => {
        expect(stopsignal(9).toDockerCommand()).toEqual('STOPSIGNAL 9');
    });
    it('should render signal name', () => {
        expect(stopsignal('SIGINT').toDockerCommand()).toEqual('STOPSIGNAL SIGINT');
    });
})