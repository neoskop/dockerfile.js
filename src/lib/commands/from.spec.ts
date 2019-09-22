import { from } from './from';
import { Stage } from '../stage';

describe('From', () => {
    it('should render string', () => {
        expect(from('node').toDockerCommand({ getName() { return 'als' }} as Stage)).toEqual(`FROM node AS als`);
    });

    it('should render fromable', () => {
        expect(from({ getFromName() { return 'node:10' }}).toDockerCommand({ getName() { return 'als' }} as Stage)).toEqual(`FROM node:10 AS als`);
    });
})