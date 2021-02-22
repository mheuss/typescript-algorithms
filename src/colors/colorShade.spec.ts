import * as colorShade from './colorShade';

describe('compute Color Shade Unit Tests', () => {
    describe('Manipulate Color', () => {
        it('Should return a shade darker when requested', () => {
            const results = colorShade.manipulateColor('33', -10);
            expect(results).toEqual('29');
            // Hex 33 is 51 dec - 10 is 41, which  is hex 29
        });

        it('Should return a shade brighter when requested', () => {
            const results = colorShade.manipulateColor('33', 10);
            expect(results).toEqual('3d');
            // Hex 33 is 51 dec + 10 is 61, which  is hex 3d
        });
    });

    describe('Color Shade Unit Tests', () => {
        it('Should return a brighter color when asked', () => {
            expect(colorShade.colorShade('#777777', 16)).toEqual('#878787');
        });
    });
});
