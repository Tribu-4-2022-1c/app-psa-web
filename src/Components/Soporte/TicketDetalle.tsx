import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { ModalComponent } from '../ModalComponent';
import MenuDescription from './MenuDescription'

export const TicketDetalle = (props: any) => {
    const location = useLocation();
    const { ticket, version, product, severities, employees }: any = location.state;
    const [flagGenerateTask, setflagGenerateTask] = useState(false);
    const [show, setshow] = useState(false);
    const [task, setTask] = useState<any[]>([]);

    const generateTask = () => {
        setshow(true);
    }

    const closeModal = () => {
        setshow(false);
    }
    const agregarTarea = (newTask: any) => {
        task.push(newTask);
        setshow(false);
    }

    return (
        <div>
            <MenuDescription version={version} product={product} flagGenerateTask={flagGenerateTask} functionGenerateTask={generateTask} />
            <ModalComponent show={show} employees={employees} closeModal={closeModal} agregarTarea={agregarTarea}></ModalComponent>
        </div>
    )
}
