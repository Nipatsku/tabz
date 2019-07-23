// Custom Mock factories.

export type LocalStorage = Storage
export const LocalStorage = (): LocalStorage => <any>({
    getItem: () => {},
    setItem: () => {}
})
