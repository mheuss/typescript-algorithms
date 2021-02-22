
/*
 */

/**
 * When given a color, this function returns a value between 0 and 1 to represent its brightness.
 * @param string RGB Hex
 * @returns number Between 0 and 1, with 1 being full brightness.
 *
 * I wish I could say this was my work. But... credit where credit is due - I adapted this from here:
 * https://stackoverflow.com/questions/1855884/determine-font-color-based-on-background-color
 */

export function hexToLuma(color: string): number {
    const hex = color.replace(/#/, '')
    const red = parseInt(hex.substr(0, 2), 16)
    const green = parseInt(hex.substr(2, 2), 16)
    const blue = parseInt(hex.substr(4, 2), 16)

    return [0.299 * red, 0.587 * green, 0.114 * blue].reduce((a, b) => a + b) / 255
}