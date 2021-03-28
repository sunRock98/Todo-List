import { Col, List } from "antd";
import { BorderOutlined, CheckOutlined, DeleteOutlined, EditFilled, EditOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from "react";
import { TodoEntity } from "../app/TodoEntity";



type Props = {
    item: TodoEntity,
    deleteClickHandler: () => void;
    setUpdate: (arg0: string, arg1: React.Key, arg2?: boolean ) => void;
}

export const ToDo = ({ item, deleteClickHandler, setUpdate }: Props) => {
    const [noneditable, setEditable] = useState<boolean>(true);
    type TRef = { current: HTMLInputElement | null };
    const ref1: TRef = useRef<HTMLInputElement>(null);

    const editClickHandler = () => {
        setEditable(prev => !prev);
    };

    useEffect(() => {
        if (!noneditable) {
            if (ref1 && ref1.current) {
                ref1.current.focus();
            }
        }
    }, [noneditable])


    return (
        <List.Item data-testid={'todo-item'}>
            <Col span={1} >
                {item.done ?
                    <CheckOutlined onClick={() => setUpdate(item.todo, item.key, false)} className='done' /> :
                    <BorderOutlined onClick={() => setUpdate(item.todo, item.key, true)} />}
            </Col>
            <Col span={19}>
                <div className="list">
                    <p>
                        <input type="text"
                            disabled={noneditable}
                            id={item.key.toString()}
                            value={item.todo}
                            className={item.done ? 'lineThrough' : undefined}
                            onChange={(e) => { setUpdate(e.target.value, item.key, item.done) }}
                            onBlur={() => setEditable(prev => !prev)}
                            ref={ref1}
                        />
                    </p>
                </div>
            </Col>
            <Col span={2} >
                <DeleteOutlined onClick={deleteClickHandler} className='deleteButton' />
            </Col>
            <Col span={2} >
                {noneditable ? <EditOutlined onClick={editClickHandler} /> :
                    <EditFilled twoToneColor="#eb2f96" onClick={editClickHandler} />}
            </Col>
        </List.Item>

    )
}