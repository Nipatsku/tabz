
/**
 *
 */
export const lerp = (amount: number, min: number, max: number): number =>
    min + amount * (max - min)
