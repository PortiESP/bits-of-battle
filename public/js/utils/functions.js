/**
 * The clamp function restricts a value to be within a specified range. If the value is less than the minimum, it returns the minimum. If the value is greater than the maximum, it returns the maximum. Otherwise, it returns the value.
 * @param {int} value The value to clamp
 * @param {int} min The minimum value
 * @param {int} max The maximum value
 * @returns {int} The clamped value
 */
export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max)
}

/**
 * Converts the progress of the objective into radians
 * @param {int} progress Number between 0 and 100
 * @returns The radians that the progress represents
 */
export function progressToRadians(progress) {
    return (progress / 100) * Math.PI * 2
}
