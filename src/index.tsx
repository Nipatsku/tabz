import * as React from "react";
import { render } from "react-dom";
import { StartMenu } from "./components/startMenu/StartMenu"

import "./styles.css";

class App extends React.Component {
  render() {
    return (
      <StartMenu />
    )
  }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
