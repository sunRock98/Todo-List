import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { ToDoList } from "./ToDoList";
import { todoEntityFabric } from "../app/TodoEntity";

describe("<ToDoList />", () => {
  let matchMedia: ((query: string) => MediaQueryList) &
    ((query: string) => MediaQueryList);

  beforeEach(() => {
    localStorage.clear();

    matchMedia = window.matchMedia;
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  afterEach(() => {
    window.matchMedia = matchMedia;
    localStorage.clear();
  });

  it("should add new todo item", () => {
    const {
      getByPlaceholderText,
      getByRole,
      queryByDisplayValue,
      getAllByTestId,
    } = render(<ToDoList />);

    expect(getAllByTestId("todo-item")).toHaveProperty("length", 5);
    expect(queryByDisplayValue("test todo item")).toBeNull();

    fireEvent.change(getByPlaceholderText("Write new todo"), {
      target: { value: "test todo item" },
    });
    fireEvent.click(getByRole("button", { name: /add/i }));

    expect(getAllByTestId("todo-item")).toHaveProperty("length", 6);
    expect(queryByDisplayValue("test todo item")).toBeTruthy();
  });

  it("should render todo items from localStorage", () => {
    localStorage.setItem(
      "myToDos",
      JSON.stringify([todoEntityFabric("1", "foo")])
    );
    const { queryByDisplayValue } = render(<ToDoList />);
    expect(queryByDisplayValue("foo")).toBeDefined();
  });

  it("should remove todo item from the list", () => {
    localStorage.setItem(
      "myToDos",
      JSON.stringify([todoEntityFabric("1", "foo")])
    );
    const { queryByDisplayValue, getByLabelText } = render(<ToDoList />);

    fireEvent.click(getByLabelText("delete"));
    expect(queryByDisplayValue("foo")).toBeNull();
  });
});
