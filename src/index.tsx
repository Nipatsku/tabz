import * as React from "react";
import { render } from "react-dom";
import App from "./components/App"
import { BrowserRouter } from "react-router-dom"
import "./styles.css";

const rootElement = document.getElementById("root");
render(
    <BrowserRouter
        basename={process.env.PUBLIC_URL}
    >
        <App/>
    </BrowserRouter >,
    rootElement
)
