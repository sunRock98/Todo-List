
export interface TodoEntity {
  key: string | number;
  todo: string;
  done: boolean;
}

export type TodoListState = TodoEntity[];

export type TodoEntityId = TodoEntity["key"];

export const todoEntityFabric = (
  id: TodoEntityId,
  text: TodoEntity["todo"],
  done: boolean = false,
  data: Partial<TodoEntity> = {}
): TodoEntity => ({
  key: id,
  todo: text,
  done: done,
  ...data,
});
