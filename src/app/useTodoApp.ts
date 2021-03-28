import { useEffect, useRef } from "react";
import { useTodoList } from "./useTodoListStateManager";
import { useTodoListStorage } from "./useTodoListStorage";

const defaultTodoItems = [
  {
    todo: 'Learn GraphQL and gRPC',
    key: '16520',
    done: false,
  },
  {
    todo: 'Add COOKIE Notification',
    key: '16521',
    done: false,
  },
  {
    todo: 'Refactor last week code',
    key: '16522',
    done: false,
  },
  {
    todo: 'Help the dog to find itself in that holly world',
    key: '16523',
    done: false,
  },
  {
    todo: 'Read: Los Angeles battles huge wildfires.',
    key: '16525',
    done: false,
  },
];

export const useTodoApp = () => {
  const {
    state,
    populateList,
    addTodoItem,
    updateTodoItem,
    removeTodoItem,
  } = useTodoList();

  const { write, read } = useTodoListStorage();
  const todoItems = state;
  const ignoreWrite = useRef(true);

  useEffect(() => {
    if (!ignoreWrite.current) {
      write(state);
    }
    ignoreWrite.current = false;
  }, [write, state]);

  useEffect(() => {
    const data = read();
    ignoreWrite.current = !data;
    populateList(data ?? defaultTodoItems);
  }, []);

  return {
    todoItems,
    addTodoItem,
    updateTodoItem,
    removeTodoItem,
  };
};
