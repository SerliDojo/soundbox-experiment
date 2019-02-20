import React from "react";
import ReactDOM from "react-dom";

import Connection from "./Connection";

const Index = props => (
    <div>
      Hello React!
        {props.children}
    </div>
);

ReactDOM.render(
    (
        <Index>
            <Connection />
        </Index>
    ),
    document.getElementById("app"),
);
