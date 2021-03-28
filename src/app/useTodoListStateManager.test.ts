import { act, renderHook } from "@testing-library/react-hooks";
import { useTodoList } from "./useTodoListStateManager";
import { todoEntityFabric } from "./TodoEntity";

describe("useTodoList", () => {
  it("should create default state", () => {
    const { result } = renderHook(() => useTodoList());
    expect(result.current.state).toEqual([]);
  });

  it("should populate state", () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.populateList([
        todoEntityFabric(2, "bar"),
        todoEntityFabric(1, "foo"),
      ]);
    });

    expect(result.current.state).toEqual([
      expect.objectContaining({
        key: 2,
        todo: "bar",
      }),
      expect.objectContaining({
        key: 1,
        todo: "foo",
      }),
    ]);
  });

  it("should add todo item", () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.addTodoItem(todoEntityFabric(1, "foo"));
    });

    expect(result.current.state).toEqual([
      expect.objectContaining({
        key: 1,
        todo: "foo",
      }),
    ]);
  });

  it("should update todo item", () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.populateList([
        todoEntityFabric(2, "bar"),
        todoEntityFabric(1, "foo"),
      ]);
      result.current.updateTodoItem(todoEntityFabric(2, "baz"));
    });

    expect(result.current.state).toEqual([
      expect.objectContaining({
        key: 2,
        todo: "baz",
        done: false,
      }),
      expect.objectContaining({
        key: 1,
        todo: "foo",
        done: false,
      }),
      
    ]);
  });

  it("should remove todo item", () => {
    const { result } = renderHook(() => useTodoList());
    act(() => {
      result.current.populateList([
        todoEntityFabric(2, "bar"),
        todoEntityFabric(1, "foo"),
      ]);


      result.current.removeTodoItem(1);
    });

    expect(result.current.state).toEqual([
      expect.objectContaining({
        key: 2,
        todo: "bar",
      }),

    ]);
  });
});
