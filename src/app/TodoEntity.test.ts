import { todoEntityFabric } from "./TodoEntity";

describe("getTodoEntityId", () => {
  it("should return TodoEntity done", () => {
    expect(todoEntityFabric(15, 'foo', true)).toEqual({key:15, todo: 'foo', done: true});
  });

  it("should return TodoEntity not done", () => {
    expect(todoEntityFabric(15, 'foo')).toEqual({key:15, todo: 'foo', done: false});
  });
});
