import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { CheckAuth } from "./auth/check-auth";
import { LevelView } from "./pages/level/level-view";
import { LoginPage } from "./pages/login/login-page";
import { RegisterPage } from "./pages/register/register-page";
import { LevelDesigner } from "./pages/level-designer/level-designer";
import { AllLevels } from "./pages/all-levels/all-levels";
import { NavBar } from "./components/navbar/navbar";
import { LandingPage } from "./pages/landing/landing";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Routes>
          {/* protected routes inside this tag */}
          <Route element={<CheckAuth />}>

          </Route>
          <Route path="/level/:title" element={<LevelView />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<LevelDesigner />} />
          <Route path="/explore" element={<AllLevels />} />
          <Route path="/home" element={<LandingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
