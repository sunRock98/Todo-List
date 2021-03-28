import { Button, Col, Input, Row } from "antd"
import React, { useState } from "react"
import { TodoEntity, todoEntityFabric } from "../app/TodoEntity";


type Props = {
    addToDo: (arg0: TodoEntity) => void;
}

export const ToDoListHeader = ({ addToDo }: Props) => {
    const [currentToDo, setCurrent] = useState('');

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrent(e.currentTarget.value);
    }
    const addClickHandler = () => {
        if(currentToDo === "") return;
        addToDo(todoEntityFabric( new Date().valueOf(),  currentToDo ));
        setCurrent('');
    }

    const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.code === 'Enter') {
            addClickHandler();
        }
    }

    return (<Row>
        <Col span={22}>
            <Input placeholder="Write new todo"
                value={currentToDo}
                onChange={changeHandler}
                onKeyDown={keyDownHandler} />
        </Col>
        <Col span={2}>
            <Button onClick={addClickHandler}>Add</Button>
        </Col>
    </Row>

    )
}