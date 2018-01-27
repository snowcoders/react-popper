import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./app";

let mountingDiv = document.createElement("div");
document.body.appendChild(mountingDiv);

ReactDOM.render(<App />, mountingDiv);
