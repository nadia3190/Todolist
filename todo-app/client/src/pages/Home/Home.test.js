import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import { act } from "react";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

beforeEach(() => {
  localStorage.setItem("token", "test-token");
  localStorage.setItem("userName", "John Doe");
});

afterEach(() => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
});

test("renders Home component and shows username", () => {
  act(() => {
    render(
      <Router>
        <Home />
      </Router>
    );
  });

  const welcomeMessage = screen.getByText(/Welcome, John Doe!/i);
  expect(welcomeMessage).toBeInTheDocument();

  const logoutButton = screen.getByRole("button", { name: /logout/i });
  expect(logoutButton).toBeInTheDocument();
});

test("redirects to login if no token is found", () => {
  localStorage.removeItem("token");

  const navigate = jest.fn();
  jest
    .spyOn(require("react-router-dom"), "useNavigate")
    .mockImplementation(() => navigate);

  act(() => {
    render(
      <Router>
        <Home />
      </Router>
    );
  });

  expect(navigate).toHaveBeenCalledWith("/login");
});

test("logs out and redirects to login", () => {
  const navigate = jest.fn();
  jest
    .spyOn(require("react-router-dom"), "useNavigate")
    .mockImplementation(() => navigate);

  act(() => {
    render(
      <Router>
        <Home />
      </Router>
    );
  });

  const logoutButton = screen.getByRole("button", { name: /logout/i });
  fireEvent.click(logoutButton);

  expect(localStorage.getItem("token")).toBe(null);
  expect(localStorage.getItem("userName")).toBe(null);
  expect(navigate).toHaveBeenCalledWith("/login");
});
