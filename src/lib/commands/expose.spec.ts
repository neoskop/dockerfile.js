import { expose } from './expose';

describe('Expose', () => {
    it('should render port', () => {
        expect(expose(8080).toDockerCommand()).toEqual(`EXPOSE 8080`);
    });

    it('should render port and protocol', () => {
        expect(expose(8080, 'tcp').toDockerCommand()).toEqual(`EXPOSE 8080/tcp`);
    });
})