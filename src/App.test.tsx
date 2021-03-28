import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

jest.mock("./components/ToDoList", () => ({
  ToDoList: () => <div>TODO LIST MOCK</div>,
}));

describe("<App />", () => {
  it("should render todo list", () => {
    const { queryByText } = render(<App />);
    expect(queryByText("TODO LIST MOCK")).toBeDefined();
  });
});
