import React from 'react';
import {Divider, List} from 'antd';
import {ToDoListHeader} from './ToDoListHeader';
import {ToDo} from './ToDo';
import {todoEntityFabric, TodoEntity} from "../app/TodoEntity";
import {useTodoApp} from "../app/useTodoApp";


export const ToDoList = () => {
    const {todoItems, addTodoItem, updateTodoItem, removeTodoItem} = useTodoApp();

    const addToDo = (todo: TodoEntity): void => {
        addTodoItem(todo);
    }

    const deleteClickHandler = (keyEl: React.Key) => {
        removeTodoItem(keyEl);
    }

    const setUpdate = (todoText: string, keyEL: React.Key, done: boolean = false) => {
        updateTodoItem(todoEntityFabric(keyEL, todoText, done));
    }

    return (
        <div className='width_40'>
            <Divider orientation="left">My ToDo List</Divider>
            <List
                size="large"
                header={<ToDoListHeader addToDo={addToDo} />}
                bordered
                dataSource={todoItems}
                renderItem={item => <ToDo item={item}
                    deleteClickHandler={() => deleteClickHandler(item.key)}
                    setUpdate={setUpdate} />}
            />
        </div>)
}