import React from "react";
import { fireEvent, getAllByRole, getByDisplayValue, getByTestId, getByText, queryByLabelText, render } from "@testing-library/react";
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

  it("should make todo item editable", () => {
    localStorage.setItem(
      "myToDos",
      JSON.stringify([todoEntityFabric("1", "foo")])
    );

    const { queryByDisplayValue, getByLabelText } = render(<ToDoList />);

    fireEvent.click(getByLabelText("edit"));
    expect(queryByDisplayValue("foo")).not.toHaveAttribute('disabled');
  });

  it("should make todo item uneditable on blur", () => {
    localStorage.setItem(
      "myToDos",
      JSON.stringify([todoEntityFabric("1", "foo"),todoEntityFabric("2", "bar")])
    );

    const { queryByDisplayValue, getAllByLabelText, getByDisplayValue } = render(<ToDoList />);

    fireEvent.click(getAllByLabelText("edit")[0]);
    expect(queryByDisplayValue("foo")).not.toHaveAttribute('disabled');
    fireEvent.focusOut(getByDisplayValue("foo"));
    expect(queryByDisplayValue("foo")).toHaveAttribute('disabled');

  });

  it("should update todo item to be 'done'", () => {
    localStorage.setItem(
      "myToDos",
      JSON.stringify([todoEntityFabric("1", "foo")])
    );

    const { queryByDisplayValue, getByLabelText, queryByLabelText } = render(<ToDoList />);

    fireEvent.click(getByLabelText("border"));
    expect(queryByDisplayValue("foo")).toHaveAttribute('class', 'lineThrough');
    expect(queryByLabelText("border")).toBeNull();
    fireEvent.click(getByLabelText("check"));
    expect(queryByDisplayValue("foo")).not.toHaveAttribute('class', 'lineThrough');
    expect(queryByLabelText("check")).toBeNull();


  });

  it("should update todo item to be 'undone'", () => {
    localStorage.setItem(
      "myToDos",
      JSON.stringify([todoEntityFabric("1", "foo", true)])
    );

    const { queryByDisplayValue, getByLabelText, queryByLabelText } = render(<ToDoList />);

    
    expect(queryByLabelText("border")).toBeNull();
    fireEvent.click(getByLabelText("check"));
    expect(queryByDisplayValue("foo")).not.toHaveAttribute('class', 'lineThrough');
    expect(queryByLabelText("check")).toBeNull();


  });
});
