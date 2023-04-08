import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { CheckAuth } from "./auth/check-auth";
import { LevelView } from "./pages/level/level-view";
import { LoginPage } from "./pages/login/login-page";
import { RegisterPage } from "./pages/register/register-page";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* protected routes inside this tag */}
          <Route element={<CheckAuth />}>

          </Route>
          <Route path="/level" element={<LevelView />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
