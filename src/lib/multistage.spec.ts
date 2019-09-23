import { Multistage, multistage } from './multistage';
import { Stage, stage } from './stage';

describe('Multistage', () => {
    let s0 : Multistage;
    let s1 : Multistage;
    let s10 : Stage;
    let s11 : Stage;
    let s2 : Stage;

    beforeEach(() => {
        s2 = stage('s2');
        s11 = stage('s11');
        s10 = stage('s10');
        s1 = multistage().stages(s10, s11);
        s0 = multistage().stages(s1, s2);
    })

    it('should iterate over all nested stages', () => {
        expect([ ...s0 ]).toEqual([ s10, s11, s2 ]);
    })
})