import { from } from './from';

describe('From', () => {
    it('should render string', () => {
        expect(from('node').toDockerCommand()).toEqual(`FROM node`);
    });

    it('should render fromable', () => {
        expect(from({ getFromName() { return 'node:10' }}).toDockerCommand()).toEqual(`FROM node:10`);
    });

    it('should render string with alias', () => {
        expect(from('node').toDockerCommand('als')).toEqual(`FROM node AS als`);
    });

    it('should render fromable with alias', () => {
        expect(from({ getFromName() { return 'node:10' }}).toDockerCommand('als')).toEqual(`FROM node:10 AS als`);
    });
})