import React from "react";
import { todoEntityFabric } from "../app/TodoEntity";
import { ToDo } from "./ToDo";
import { fireEvent, render } from "@testing-library/react";

describe("<ToDo />", () => {
  it("should render todo text", () => {
    const { queryByDisplayValue } = render(
      <ToDo
        item={todoEntityFabric(1, "foo")}
        deleteClickHandler={() => {}}
        setUpdate={() => {}}
      />
    );

    expect(queryByDisplayValue("foo")).toBeTruthy();
  });

  it("should render enabled textbox on edit click", () => {
    const { getByLabelText, getByRole } = render(
      <ToDo
        item={todoEntityFabric(1, "foo")}
        deleteClickHandler={() => {}}
        setUpdate={() => {}}
      />
    );

    fireEvent.click(getByLabelText("edit"));

    const input = getByRole("textbox");
    expect(input).toBeTruthy();
    expect(input.getAttribute("disabled")).toBe(null);
  });

  it("should invoke delete callback when delete was clicked", () => {
    const handler = jest.fn();
    const { getByLabelText } = render(
      <ToDo
        item={todoEntityFabric(1, "foo")}
        deleteClickHandler={handler}
        setUpdate={() => {}}
      />
    );

    expect(handler).not.toHaveBeenCalled();
    fireEvent.click(getByLabelText("delete"));
    expect(handler).toHaveBeenCalled();
  });

  it("should invoke update callback when input was changed", () => {
    const handler = jest.fn();
    const { getByLabelText, getByRole } = render(
      <ToDo
        item={todoEntityFabric(7, "foo")}
        deleteClickHandler={() => {}}
        setUpdate={handler}
      />
    );

    fireEvent.click(getByLabelText("edit"));
    const input = getByRole("textbox");

    fireEvent.change(input, { target: { value: "bar" } });
    expect(handler).toHaveBeenCalledWith("bar", 7, false);
  });
});
