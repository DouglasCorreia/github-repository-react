import React from "react";

import Header from "./components/header";
import Main from "./pages/main";

import "./styles/css/style.css";

const App = () => (
  <div className="App">
    <Header text="Add Github Repositories" />
    <Main />
  </div>
);

export default App;
