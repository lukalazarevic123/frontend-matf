import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { CheckAuth } from "./auth/check-auth";
import { LevelView } from "./pages/level/level-view";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* protected routes inside this tag */}
          <Route element={<CheckAuth />}>

          </Route>
          <Route path="/level" element={<LevelView />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
