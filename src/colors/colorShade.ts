/**
 * Is used to calculate the shade of a given color, and return that result.
 * Importing the default will give you this function memoized.
 * @param rgbString Must be full RGB with
 * @param brightness The amount by which you want to increase or decrease the color
 */
import {hexToLuma} from "./hexToLuma";

export function colorShade(rgbString: string, brightness: number) {
    if (!rgbString.length || rgbString.length < 6 || rgbString.length > 7) {
        return rgbString;
    }

    const correctedRGBString = rgbString.replace(/#/, '');

    // Let's shade color in a direction that doesn't alter hue
    const lumen = hexToLuma(rgbString);

    let adjustedBrightness = brightness;

    // Sanity check - don't darken a dark color, or brighten a light one.
    if ((lumen < 0.3 && brightness < 0) || (lumen > 0.75 && brightness > 0)) {
        adjustedBrightness *= -1;
    }

    const red = manipulateColor(
        correctedRGBString.slice(0, 2),
        adjustedBrightness
    );
    const green = manipulateColor(
        correctedRGBString.slice(2, 4),
        adjustedBrightness
    );
    const blue = manipulateColor(
        correctedRGBString.slice(4, 6),
        adjustedBrightness
    );

    return `#${red}${green}${blue}`;
}

/**
 * When given a hex color component, (r, g or b) - we'll convert to int and then add the brightness.
 * @param colorComponent Hex string, two characters, representing either red, green or blue
 * @param brightness The amount that is to be added to the integer value of those colors
 * @returns the modified color
 */
export function manipulateColor(
    colorComponent: string,
    brightness: number
): string {
    const convertToIntegerAndChangeBrightness =
        parseInt(colorComponent, 16) + brightness;
    const enforceBounds = Math.max(
        Math.min(255, convertToIntegerAndChangeBrightness),
        0
    ).toString(16);
    return enforceBounds.length === 1 ? `0${enforceBounds}` : enforceBounds;
}
