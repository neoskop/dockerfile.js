import { workdir } from './workdir';

describe('Workdir', () => {
    it('should render workdir', () => {
        expect(workdir('/path/to/workdir').toDockerCommand()).toEqual('WORKDIR /path/to/workdir');
    });
})