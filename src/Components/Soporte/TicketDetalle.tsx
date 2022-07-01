import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Ticket } from '../../models/Soporte.models';
import { ModalComponent } from '../ModalComponent';
import MenuDescription from './MenuDescription'
import soporteService from "../../Services/soporteService";
import detalleTicketCSS from '../../Styles/Detalle.module.css';
import { FaEye } from 'react-icons/fa';
import { Card, Table } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';

export const TicketDetalle = (props: any) => {
    const location = useLocation();
    const { ticket, version, product, severities, employees }: any = location.state;
    const [flagGenerateTask, setflagGenerateTask] = useState(false);
    const [show, setshow] = useState(false);
    const [task, setTask] = useState<any[]>([]);
    const [diasRestantes, setdiasRestantes] = useState(0);
    const initialTicket: Ticket = {
        code: 0,
        title: '',
        description: '',
        type: '',
        client: '',
        version: '',
        severity: '',
        status: '',
        creationDate: '',
        lastUpdated: '',
        closureMotive: null,
        resolution: ''
    }
    const [ticketCurrent, setticketCurrent] = useState(initialTicket);
    const generateTask = () => {
        setshow(true);
    }

    const validateFlagGenerateTask = useCallback(() => {
        if (ticket.type !== 'CONSULTA') {
            setflagGenerateTask(true);
        }
    }, [ticket])

    const closeModal = () => {
        setshow(false);
    }
    const agregarTarea = (newTask: any) => {
        task.push(newTask);
        setshow(false);
    }

    const getDiasDeVencimiento = useCallback((severity: string, dateCreation: string) => {
        let fecha1 = moment(dateCreation);
        let fecha2 = moment();
        let optionSev = severities.find((x: any) => x.level === severity);
        let diffDate = fecha2.diff(fecha1, 'days');
        setdiasRestantes(optionSev.days - diffDate);
    }, [severities])

    const getTicketsTask = async () => {
        let taskArray: any = await soporteService().getTicketsTask();
        setTask(taskArray);
    }

    useEffect(() => {
        const getData = async () => {
            setticketCurrent({ ...ticket });
            getDiasDeVencimiento(ticket.severity, ticket.creationDate);
            await getTicketsTask();
            validateFlagGenerateTask();
        }
        getData();
    }, [ticket, getDiasDeVencimiento, validateFlagGenerateTask])

    return (
        <div>
            <MenuDescription version={version} product={product} flagGenerateTask={flagGenerateTask} functionGenerateTask={generateTask} />
            <ModalComponent show={show} employees={employees} closeModal={closeModal} agregarTarea={agregarTarea}></ModalComponent>
            {ticket.type !== 'CONSULTA' && <div className={`${detalleTicketCSS.contentTaskTickets} ${(task && task.length === 0) ? detalleTicketCSS.uninformation : ''}`}>
                {(task && task.length > 0) && <div><Table responsive bordered >
                    <thead>
                        <tr className={detalleTicketCSS.tdTable}>
                            <td>Tarea</td>
                            <td>Encargado</td>
                            <td>Ir a Tarea</td>
                        </tr>
                    </thead>
                    <tbody>
                        {task.map((task: any, index: number) => <tr key={index}>
                            <td>
                                {task.title}
                            </td>
                            <td>
                                {task.employeed}
                            </td>
                            <td>
                                <FaEye />
                            </td>
                        </tr>)}
                    </tbody>
                </Table></div>}
                <div>
                    {(task && (task.length === 0)) &&
                        <Card className={detalleTicketCSS.contentCard}>
                            <CardHeader>
                                No hay Tareas Asociadas a ese Ticket
                            </CardHeader>
                        </Card>
                    }
                </div>
            </div>}
        </div>
    )
}
