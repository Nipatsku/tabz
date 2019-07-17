import { History } from "history"

export interface Navigatable {
    /**
     * Navigation history reference that is passed from react-router-dom <BrowserRouter> component under the hood.
     */
    history: History
}
