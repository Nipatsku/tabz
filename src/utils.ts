
/**
 *
 */
export const lerp = (amount: number, min: number, max: number): number =>
    min + amount * (max - min)
/**
 * Pure function for *flattening* Arrays.
 */
export const flatten = <T> (arrayOfArrays: T[][]): T[] => {
    const arr: T[] = []
    const len = arrayOfArrays.length
    for (let i = 0; i < len; i ++) {
        const arr2 = arrayOfArrays[i]
        const len2  = arr2.length
        for (let i2 = 0; i2 < len2; i2 ++)
            arr.push(arr2[len2])
    }
    return arr
}
