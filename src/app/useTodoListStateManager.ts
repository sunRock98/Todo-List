import { useState } from "react";
import { TodoEntity,  TodoEntityId, TodoListState } from "./TodoEntity";


export const useTodoList = () => {
  const [state, setState] = useState<TodoListState>([]);

  const populateList = (todoItems: TodoEntity[]) => {
    setState(state => [
      ...state,
      ...todoItems,
    ]);
  }


  const addTodoItem = (todoItem: TodoEntity) => {
    setState(state => [
      ...state,
      todoItem,
    ]);
  }

  const removeTodoItem = (todoItemId: TodoEntityId) => {
    setState(state => state.filter(el => el.key !== todoItemId));
  }

  const updateTodoItem = (todoItem: TodoEntity) => {
    setState(state => {
      const index = state.findIndex(el => el.key === todoItem.key);
      if (index === -1) return state;
      return [...state.slice(0, index), todoItem, ...state.slice(index + 1)];
    });
  }

  return {
    state,
    populateList,
    addTodoItem,
    removeTodoItem,
    updateTodoItem,
  };
};
