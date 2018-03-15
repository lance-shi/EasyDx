import React from "react";
import ReactDOM from "react-dom";
import MainContainer from "./components/container/MainContainer";

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<MainContainer />, wrapper) : false;