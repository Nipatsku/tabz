import { useState } from "react"
import { Injectable, inject } from "../../utils";

interface StringParser<T> {
    toString: (value: T) => string
    fromString: (stringValue: string) => T
}
const stringParser = <T>(
    toString: (value: T) => string,
    fromString: (stringValue: string) => T
): StringParser<T> => ({ toString, fromString })
/**
 * Hook for a generic primitive variable stored in localStorage.
 *
 * Does not crash when localStorage is not available.
 * @param key               Key in localStorage
 * @param defaultValue      Default value when a) localStorage is not available or b) localStorage is not initialized
 * @param parser            StringParser for the primitive type in question
 * @param iLocalStorage     localStorage injection interface for testing.
 */
export const useLocalStorageItem = <T>(
    key: string,
    defaultValue: T,
    parser: StringParser<T>,
    _iLocalStorage?: Injectable<Storage>
) => {
    // localStorage is not defined in test environment, so callback must be used.
    const iLocalStorage = inject(_iLocalStorage, () => localStorage)

    let initialValue: T
    if (iLocalStorage !== undefined) {
        // localStorage is available.
        // Read initial value from localStorage.
        const storedValue = iLocalStorage.getItem(key)
        initialValue = (storedValue === null) ?
            defaultValue :
            parser.fromString(storedValue)
    } else {
        // localStorage is not available.
        initialValue = defaultValue
    }
    const [value, setValue] = useState(initialValue)
    function handleChange(newValue: T) {
        setValue(newValue)
        if (iLocalStorage !== undefined) {
            // Update value in localStorage.
            iLocalStorage.setItem(key, parser.toString(newValue))
        }
    }
    return {
        value,
        handleChange
    }
}
export const ParseString = {
    Boolean: stringParser(
        (bool) => bool === true ? "true" : "false",
        (str) => str === "true" ? true : false
    ) as StringParser<boolean>
}
