import React from "react";
import "./register-page.css";
import { Container, Form } from "react-bootstrap";

export const RegisterPage = () => {
  return (
    <Container className="reg-form">
      <Form className="reg-form border" id="reg-form">
        <div className="mb-3">
          <label className="mb-2">Name</label>
          <div className="d-flex" id="person-name">
            <div>
              <Form.Control
                type="text"
                className="form-control person-name mb-1"
                id="first-name"
              />
              <div className="form-text">First name</div>
            </div>

            <div>
              <Form.Control
                type="text"
                className="form-control person-name mb-1"
                id="last-name"
              />
              <div className="form-text">Last name</div>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="mb-2">Email address</label>
          <Form.Control
            type="email"
            className="form-control mb-1"
            id="person-email"
            required
          />
        </div>

        <div className="mb-3">
          <label className="mb-2">Password</label>
          <Form.Control
            type="password"
            className="form-control mb-1"
            id="person-age"
            required
          />
        </div>
        <div>
          <div className="spinner-border loading" role="status" id="spinner">
            <span className="visually-hidden">Loading...</span>
          </div>
          <button type="submit" className="btn btn-dark" id="submit-btn">
            Submit
          </button>
        </div>
      </Form>
    </Container>
  );
};
