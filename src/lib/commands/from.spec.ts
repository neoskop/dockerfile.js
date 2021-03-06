import { from } from './from';
import { Stage, StageBuildContext, stage } from '../stage';
import { Dockerfile } from '../dockerfile';

describe('From', () => {
    it('should render string', () => {
        expect(from('node').toDockerCommand({ stage: { getName() { return 'als' }} as Stage } as StageBuildContext)).toEqual(`FROM node AS als`);
    });

    it('should render fromable', () => {
        expect(from(stage('node:10')).toDockerCommand({ stage: { getName() { return 'als' }} as Stage } as StageBuildContext)).toEqual(`FROM node:10 AS als`);
    });
})