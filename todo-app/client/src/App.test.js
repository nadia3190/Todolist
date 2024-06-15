import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

test("renders Register and Login links", () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const registerLink = screen.getByText(/Register/i);
  const loginLink = screen.getByText(/Login/i);
  expect(registerLink).toBeInTheDocument();
  expect(loginLink).toBeInTheDocument();
});
