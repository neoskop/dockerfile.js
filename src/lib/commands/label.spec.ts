import { label } from './label';

describe('Label', () => {
    it('should render name/value', () => {
        expect(label('foo', 'bar').toDockerCommand()).toEqual('LABEL "foo"="bar"');
    });
    
    it('should render array', () => {
        expect(label([['foo', 'bar']]).toDockerCommand()).toEqual('LABEL "foo"="bar"');
    });

    it('should render map', () => {
        expect(label(new Map([['foo', 'bar'], ['foobar', 'baz']])).toDockerCommand()).toEqual('LABEL "foo"="bar" \\\n    "foobar"="baz"');
    });

    it('should not render empty labels', () => {
        expect(label([]).toDockerCommand()).toEqual('');
    })
})