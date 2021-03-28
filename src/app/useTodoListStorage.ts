import { useLocalStorage } from "./useLocalStorage";
import {  TodoListState } from "./TodoEntity";

export const useTodoListStorage = () => {
  return useLocalStorage<TodoListState>("myToDos");
};
