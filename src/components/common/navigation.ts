import { History } from "history"

export interface Navigatable<T extends {}> {
    /**
     * Navigation history reference that is passed from react-router-dom <BrowserRouter> component under the hood.
     */
    history: History
    match: {
        /**
         * URL params.
         */
        params: T
    }
}
