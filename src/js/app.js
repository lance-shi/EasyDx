import React from "react";
import ReactDOM from "react-dom";
import OrgContainer from "./components/container/OrgContainer";

const wrapper = document.getElementById("orgContainer");
wrapper ? ReactDOM.render(<OrgContainer />, wrapper) : false;