import { Variable } from './variable';

export function variableTests(cmd : string, allowNoDefaultValue: boolean, factory : (...params : any[]) => Variable) {
    if(allowNoDefaultValue) {
        it('should output variable w/o default value', () => {
            expect(factory('test').toDockerCommand()).toEqual(`${cmd} test`);
        });
    }

    it('should output variable w/ default value', () => {
        expect(factory('test', 'default"value').toDockerCommand()).toEqual(`${cmd} test="default\\"value"`);
    });

    it('should output variable w/ empty string as default value', () => {
        expect(factory('test', '').toDockerCommand()).toEqual(`${cmd} test=""`);
    });

    it('should toString variable name', () => {
        expect(factory('foobar').toString()).toEqual('${foobar}');
    })
}