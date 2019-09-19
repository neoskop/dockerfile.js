import { image } from "./image";

describe('Image', () => {
    it('should generate name', () => {
        expect(image('node').getFromName()).toEqual(`node`);
    });

    it('should generate name with tag', () => {
        expect(image('node', { tag: '10' }).getFromName()).toEqual(`node:10`);
    });

    it('should generate name with digest', () => {
        expect(image('node', { digest: 'foo' }).getFromName()).toEqual(`node@foo`);
    });
})