import { Adding } from './adding';
import { Add } from './add';

export function addingTests(cmd : string, factory : (...params : ConstructorParameters<typeof Add>) => Adding) {
    it('should render single source', () => {
        expect(factory('.').toDockerCommand()).toEqual(`${cmd} [".","./"]`)
        expect(factory('.', '/bar/').toDockerCommand()).toEqual(`${cmd} [".","/bar/"]`)
    });

    it('should render multiple sources', () => {
        expect(factory([ 'foo', 'bar' ]).toDockerCommand()).toEqual(`${cmd} ["foo","bar","./"]`)
        expect(factory([ 'foo', 'bar' ], '/foobar/').toDockerCommand()).toEqual(`${cmd} ["foo","bar","/foobar/"]`)
    });

    it('should chown to user', () => {
        expect(factory('.', undefined, { chown: 'usr' }).toDockerCommand()).toEqual(`${cmd} --chown=usr [".","./"]`)
    });

    it('should chown to user and group', () => {
        expect(factory('.', undefined, { chown: [ 'usr', 'grp' ] }).toDockerCommand()).toEqual(`${cmd} --chown=usr:grp [".","./"]`)
    });
}