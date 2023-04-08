import React from "react";
import "./login-page.css";
import { Form } from "react-bootstrap";

export const LoginPage = () => {
  return (
    <form className="reg-form border" id="reg-form" >
      <div className="mb-3">
        <label  className="mb-2">
          Email address
        </label>
        <input
          type="email"
          className="form-control mb-1"
          id="person-email"
          name="person[email]"
          required
        />
      </div>

      <div className="mb-3">
        <label className="mb-2">
          Password
        </label>
        <input
          type="password"
          className="form-control mb-1"
          id="person-pass"
          name="person[password]"
          required
        />
      </div>

      <div className="text-center">
        <div className="spinner-border loading" role="status" id="spinner">
          <span className="visually-hidden">Loading...</span>
        </div>
        <button type="submit" className="btn btn-dark" id="submit-btn">
          Submit
        </button>
      </div>
    </form>
  );
};
