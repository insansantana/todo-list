import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Detail from "./pages/Detail";
import Home from "./pages/Home";

function App() {
  const paretNode = React.useRef(null);
  return (
    <Router>
      <div className="App" ref={paretNode}>
        <header
          data-cy="header"
          className="w-full flex items-center"
          style={{ backgroundColor: "#16ABF8", height: "105px" }}
        >
          <div data-cy="header-background" className="container mx-auto">
            <h1
              data-cy="header-title"
              className="nav text-3xl font-semibold text-white"
            >
              Todo List App
            </h1>
          </div>
        </header>

        <Routes>
          <Route
            path="/detail/:id"
            element={<Detail paretNode={paretNode} />}
          ></Route>
          <Route path="/" element={<Home paretNode={paretNode} />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
