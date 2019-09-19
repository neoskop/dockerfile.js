import { volume } from './volume';

describe('Volume', () => {
    it('should render volume', () => {
        expect(volume('/path/to/volume').toDockerCommand()).toEqual('VOLUME /path/to/volume');
    });
})