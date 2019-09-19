import { addingTests } from './adding.tests';
import { copy } from './copy';

describe('Copy', () => {
    addingTests('COPY', copy);

    it('copy from string', () => {
        expect(copy('.', undefined, { from: 'stage' }).toDockerCommand()).toEqual(`COPY --from=stage [".","./"]`);
    });

    it('copy from fromable', () => {
        expect(copy('.', undefined, { from: { getFromName() { return 'als'; } } }).toDockerCommand()).toEqual(`COPY --from=als [".","./"]`);
    });
})