import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Status, Ticket } from '../../models/Soporte.models';
import { ModalComponent } from '../ModalComponent';
import MenuDescription from './MenuDescription'
import soporteService from "../../Services/soporteService";
import detalleTicketCSS from '../../Styles/Detalle.module.css';
import { FaCalendar, FaEdit, FaEye, FaQuestionCircle } from 'react-icons/fa';
import { Button, Card, Col, Container, Form, InputGroup, Row, Spinner, Table } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { IoIosClose } from "react-icons/io";
import { MdOutlineError, MdTipsAndUpdates } from 'react-icons/md';
import { AiFillCloseCircle } from 'react-icons/ai';
import modalCSS from '../../Styles/Modal.module.css';

export const TicketDetalle = (props: any) => {
    const location = useLocation();
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
        closureMotive: '',
        resolution: '',
        responsible: ''
    }
    const initialStatus: Status[] = [
        {
            isValid: true,
            wasOnFocus: false,
            onFocus: false
        },
        {
            isValid: true,
            wasOnFocus: false,
            onFocus: false
        },
        {
            isValid: true,
            wasOnFocus: false,
            onFocus: false
        },
        {
            isValid: true,
            wasOnFocus: false,
            onFocus: false
        }
    ]
    const { ticket, version, product, severities, employees }: any = location.state;
    const [flagGenerateTask, setflagGenerateTask] = useState(false);
    const [show, setshow] = useState(false);
    const [taskSoporte, setTaskSoporte] = useState<any[]>([]);
    const [proyects, setproyects] = useState<any[]>([]);
    const [disabled, setdisabled] = useState(true);
    const [spinner, setspinner] = useState(false);
    const [diasRestantes, setdiasRestantes] = useState(0);
    const [statusForm, setstatusForm] = useState(false);
    const [statusTickets, setstatusTickets] = useState<[]>([]);
    const [statusValue, setStatusValue] = useState<Status[]>(initialStatus);
    const [taskProyect, setTaskProyect] = useState([]);
    let navigate = useNavigate();
    const typesTickets = [
        'CONSULTA', 'ERROR', 'MEJORA'
    ]

    const [ticketCurrent, setticketCurrent] = useState(initialTicket);
    const generateTask = () => {
        setshow(true);
    }

    const onFocusInput = (state:boolean,indexStatus:number) => {
        let newStatusArray = [...statusValue];
        let newStatus:Status = {
          isValid:statusValue[indexStatus].isValid,
          wasOnFocus:true,
          onFocus:state
        }
        newStatusArray[indexStatus] = newStatus;
        setStatusValue(newStatusArray);
      }

    const changeStateEdit = (state: boolean) => {
        if (state) {
            setStatusValue(initialStatus);
            setticketCurrent({ ...ticket });
            getDiasDeVencimiento(ticket.severity, ticket.creationDate);
        };
        setdisabled(state);
    }

    const validateForm = () => {
        setstatusForm(true);
        let index_: number = (ticketCurrent.status !== 'Cancelado') ? 2 : 3;
        let invalidData = statusValue.find((x: Status, index: number) => {
            if (!x.isValid && index <= index_) {
                return x
            }
        });
        if (invalidData === null || invalidData === undefined) return true;
        return false;
    }

    const initializeData = async () => {
        let states: any = await soporteService().getStates();
        setstatusTickets(states);
    }

    const validateFlagGenerateTask = useCallback(() => {
        if (ticket.type !== 'CONSULTA') {
            setflagGenerateTask(true);
        }
    }, [ticket])

    const closeModal = () => {
        setshow(false);
    }
    const agregarTarea = async (newTask: any) => {
        setspinner(true);
        /*let taskArray: any = await soporteService().getTicketsTask(ticketCurrent.code);
        let tasksAllProyectos: any = await soporteService().getTasksProyectos();
        let proyects: any = await soporteService().getProyects();
        setproyects(proyects);
        setTaskSoporte(taskArray);
        setTaskProyect(tasksAllProyectos);*/
        await getTasksProyectos();
        setspinner(false);
        setshow(false);
    }

    const getDiasDeVencimiento = useCallback((severity: string, dateCreation: string) => {
        let fecha1 = moment(dateCreation);
        let fecha2 = moment();
        let optionSev = severities.find((x: any) => x.level === severity);
        let diffDate = fecha2.diff(fecha1, 'days');
        setdiasRestantes(optionSev.days - diffDate);
    }, [severities])

    const getTicketsTask = async (taskArrayProyectos:any) => {
        //Otengo las tareas de un ticket
        let taskArray: any = await soporteService().getTicketsTask(ticket.code);
        mapearDatos(taskArray,taskArrayProyectos);
        console.log(taskArray)
        //setTaskSoporte(taskArray);
    }

    const getProyects = async () => {
        let proyects: any = await soporteService().getProyects();
        console.log(proyects)
        setproyects(proyects);
    }

    const getTasksProyectos = async () => {
        let taskArrayProyectos: any = await soporteService().getTasksProyectos();
        await getTicketsTask(taskArrayProyectos);
        setTaskProyect(taskArrayProyectos);
    }

    const updateData = async () => {
        let status = validateForm();
        console.log(status)
        if (!status) return;
        const response = await soporteService().updateTicket(ticketCurrent);
        navigate(`/soporte/${product}/${version}`);
        console.log(response)
    }

    const changeValue = (prop: string, value: any, indexStatus: any = null) => {
        if(indexStatus!==null){
            let newStatusArray = [...statusValue];
            let newStatus: Status = {
                isValid: (value.target.value !== '') ? true : false,
                wasOnFocus: true,
                onFocus: statusValue[indexStatus].onFocus
            }
            newStatusArray[indexStatus] = newStatus;
            setStatusValue(newStatusArray);
            console.log(newStatusArray)    
        }
        setticketCurrent({ ...ticketCurrent, [prop]: value.target.value });
    }

    const changeValueSeverities = (value: any) => {
        getDiasDeVencimiento(value.target.value, ticket.dateCreation);
    }

    const getTitle = useCallback((idTask:string) => {
        //return "task.nombre";
        if(!taskSoporte||taskSoporte.length==0) return '';
        let task:any = taskSoporte.find( (x:any) => x.id ===  parseInt(idTask));
        console.log(idTask)
        if(!task) return ;
        return task.nombre;
    },[taskSoporte])

    const getEmployee = (idTask:string) => {
        return 'ww'
        if(!taskSoporte||taskSoporte.length==0) return ''
        let task:any = taskSoporte.find( (x:any) => x.id ===  parseInt(idTask));
        //if(!task) return;
        let employee = employees.find( (employee:any)=> employee.legajo === parseInt(task.recursoAsignado.name));
        if(!employee) return "";
        return employee.nombre +' '+ employee.apellido;
    }

    const goToTaskProyects = (idTask:string) => {
        if(!taskProyect||taskProyect.length==0) return '';
        let task:any = taskProyect.find( (x:any) => x.nombre ===  (idTask));
        navigate(`/proyectos/${task.proyectoID}`);
    }

    const mapearDatos = (taskSoporte:any,taskArrayProyectos:any) => {
        if(!taskSoporte) return
        let newTaskSoporte:any = taskSoporte.map( (task:any) => {
            let taskProyecto:any = taskArrayProyectos.find((x:any) => parseInt(x.id) === parseInt(task.id.task));
            task.id.task = (taskProyecto)?taskProyecto.nombre:'Tarea no encontrada';
            return task
        });
        setTaskSoporte(newTaskSoporte);
    }

    useEffect(() => {
        const getData = async () => {
            setspinner(true);
            setticketCurrent({ ...ticket });
            getDiasDeVencimiento(ticket.severity, ticket.creationDate);
            await getProyects();
            await getTasksProyectos();
            validateFlagGenerateTask();
            initializeData();
            setspinner(false);
        }
        getData();
    }, [ticket, getDiasDeVencimiento, validateFlagGenerateTask])

    return (
        <div>
            <MenuDescription version={version} product={product}
            flagGenerateTask={flagGenerateTask} functionGenerateTask={generateTask} />
            <ModalComponent show={show} currentTicket={ticketCurrent} proyects={proyects} employees={employees} closeModal={closeModal} agregarTarea={agregarTarea}></ModalComponent>
            <div className={detalleTicketCSS.contentContainer}>
                <Row md={12} className={detalleTicketCSS.contentRow}>
                    <Col md={5} className={detalleTicketCSS.col4}>
                        <Row>
                            <div>
                                <Form.Group className={detalleTicketCSS.contentItem}>
                                    <Form.Label className={detalleTicketCSS.label}>Cliente:</Form.Label>
                                    <Form.Control
                                        className={`${(disabled) ? detalleTicketCSS.disabled : ''} ${detalleTicketCSS.input}`}
                                        type="text"
                                        id="client"
                                        disabled
                                        value={ticketCurrent.client}
                                        onChange={(value) => changeValue('client', value)}
                                    />
                                </Form.Group>
                                <Form.Group className={detalleTicketCSS.contentItem}>
                                    <Form.Label className={detalleTicketCSS.label}>Responsable:</Form.Label>
                                    <div className={detalleTicketCSS.contentInput}>
                                        <Form.Select value={ticketCurrent.status} disabled={disabled} className={`${(disabled) ? detalleTicketCSS.disabled : ''} 
                                            ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('status', value)}>
                                            {employees.map((type: any, index: number) => <option key={type.legajo} value={type}>{type.nombre}  {type.apellido}</option>)}
                                        </Form.Select>
                                    </div>
                                </Form.Group>
                                <Form.Group className={detalleTicketCSS.contentItem}>
                                    <Form.Label className={detalleTicketCSS.label}>Fecha de creación:</Form.Label>
                                    <InputGroup className="mb-2">
                                        <Form.Control
                                            className={`${(disabled) ? detalleTicketCSS.disabled : ''} ${detalleTicketCSS.input}`}
                                            type="text"
                                            id="creationDate"
                                            disabled
                                            value={ticketCurrent.creationDate}
                                            onChange={(value) => changeValue('creationDate', value)}
                                        />
                                        <InputGroup.Text><FaCalendar className={`${detalleTicketCSS.icon}  ${detalleTicketCSS.calendar}`} /></InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                                <div>
                                    <Form.Group className={detalleTicketCSS.contentItem}>
                                        <Form.Label className={detalleTicketCSS.label}>Fecha de Resolución:</Form.Label>
                                        <InputGroup className="mb-2">
                                            <Form.Control
                                             className={`${(disabled) ? detalleTicketCSS.disabled : ''} ${detalleTicketCSS.input} 
                                             ${((!statusValue[0].isValid&&statusValue[0].wasOnFocus)||(!statusValue[0].isValid&&statusForm))?detalleTicketCSS.invalidData:''}
                                             ${(!statusValue[0].isValid&&statusValue[0].onFocus)?detalleTicketCSS.invalidDataOnfocus:''}
                                             ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`}
                                                type="text"
                                                onFocus={() => onFocusInput(true,0)}
                                                onBlur={() => onFocusInput(false,0)}
                                                id="resolution"
                                                disabled={disabled}
                                                value={ticketCurrent.resolution}
                                                onChange={(value) => changeValue('resolution', value, 0)}
                                            />
                                            <InputGroup.Text><FaCalendar className={`${detalleTicketCSS.icon}  ${detalleTicketCSS.calendar}`} /></InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>
                                </div>

                                <Form.Group className={detalleTicketCSS.contentItem}>
                                    <Form.Label className={detalleTicketCSS.label}>Dias de faltantes:</Form.Label>
                                    <div className={detalleTicketCSS.contentInput}>
                                        <Form.Control
                                            className={`${(disabled) ? detalleTicketCSS.disabled : ''} ${detalleTicketCSS.input} ${detalleTicketCSS.addRight}`}
                                            type="text"
                                            id="diasRestantes"
                                            disabled
                                            value={diasRestantes}
                                        />
                                    </div>
                                </Form.Group>
                            </div>
                        </Row>
                        <Row>
                            <Col>
                                <div>
                                    <Form.Group className={detalleTicketCSS.contentItem}>
                                        <Form.Label className={detalleTicketCSS.label}>Severidad:</Form.Label>
                                        <div className={detalleTicketCSS.contentInput}>
                                            <Form.Select value={ticketCurrent.severity} disabled={disabled}
                                                className={`${(disabled) ? detalleTicketCSS.disabled : ''} 
                            ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => { changeValueSeverities(value); changeValue('severity', value) }}>
                                                {severities.map((severitie: any, index: number) => <option key={index} value={severitie.level}>{severitie.level}-{severitie.days} dias</option>)}
                                            </Form.Select>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className={detalleTicketCSS.contentItem}>
                                        <Form.Label className={detalleTicketCSS.label}>Tipo:</Form.Label>
                                        <div className={detalleTicketCSS.contentInput}>
                                            <Form.Select value={ticketCurrent.type} disabled className={`
                            ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect} ${detalleTicketCSS.disabled}`} onChange={(value) => changeValue('type', value)}>
                                                {typesTickets.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                                            </Form.Select>
                                        </div>
                                    </Form.Group >
                                    <Form.Group className={detalleTicketCSS.contentItem}>
                                        <Form.Label className={detalleTicketCSS.label}>Estado:</Form.Label>
                                        <div className={detalleTicketCSS.contentInput}>
                                            <Form.Select value={ticketCurrent.status} disabled={disabled} className={`${(disabled) ? detalleTicketCSS.disabled : ''} 
                            ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('status', value)}>
                                                {statusTickets.map((type: any, index: number) => <option key={index} value={type.id}>{type.value}</option>)}
                                            </Form.Select>
                                        </div>
                                    </Form.Group >
                                </div>
                            </Col>
                            <Col className={`${detalleTicketCSS.content_iconState}`}>
                                {ticketCurrent.type === 'ERROR' ? <MdOutlineError className={`${detalleTicketCSS.icon} 
                            ${detalleTicketCSS.error} ${detalleTicketCSS.iconState}`} /> :
                                    ticketCurrent.type === 'CONSULTA' ?
                                        <FaQuestionCircle className={`${detalleTicketCSS.icon}  ${detalleTicketCSS.consulta} 
                                ${detalleTicketCSS.iconState}`} /> :
                                        <MdTipsAndUpdates className={`${detalleTicketCSS.icon}  ${detalleTicketCSS.update} 
                                ${detalleTicketCSS.iconState}`} />}
                            </Col>
                        </Row>
                    </Col>
                    <Col md={7} className={detalleTicketCSS.col8}>
                        {!disabled && <Button className={detalleTicketCSS.iconSave} onClick={() => updateData()} variant="success">Guardar</Button>}
                        {!disabled &&
                            <AiFillCloseCircle className={`${detalleTicketCSS.editIcon} ${detalleTicketCSS.iconClose}`} onClick={() => changeStateEdit(true)} />
                        }
                        {disabled &&
                            <FaEdit className={`${detalleTicketCSS.editIcon}`} onClick={() => changeStateEdit(false)} />
                        }
                        <Form.Group className={detalleTicketCSS.contentItem}>
                            <Form.Label className={detalleTicketCSS.label} htmlFor="title">Título:</Form.Label>
                            <Form.Control
                             className={`${(disabled) ? (detalleTicketCSS.disabled && detalleTicketCSS.removeCorner) : ''}
                             ${((!statusValue[1].isValid&&statusValue[1].wasOnFocus)||(!statusValue[1].isValid&&statusForm))?detalleTicketCSS.invalidData:''}
                             ${(!statusValue[1].isValid&&statusValue[1].onFocus)?detalleTicketCSS.invalidDataOnfocus:''}
                             ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`}
                                as="textarea"
                                rows={2}
                                onFocus={() => onFocusInput(true,1)}
                                onBlur={() => onFocusInput(false,1)}
                                id="title"
                                disabled={disabled}
                                value={ticketCurrent.title}
                                onChange={(value) => changeValue('title', value, 1)}
                            />
                        </Form.Group>
                        <Form.Group className={detalleTicketCSS.contentItem}>
                            <Form.Label className={detalleTicketCSS.label} htmlFor="inputPassword5">Descripción:</Form.Label>
                            <Form.Control
                             className={`${(disabled) ? (detalleTicketCSS.disabled && detalleTicketCSS.removeCorner) : ''}
                             ${((!statusValue[2].isValid&&statusValue[2].wasOnFocus)||(!statusValue[2].isValid&&statusForm))?detalleTicketCSS.invalidData:''}
                             ${(!statusValue[2].isValid&&statusValue[2].onFocus)?detalleTicketCSS.invalidDataOnfocus:''}
                             ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`}
                                as="textarea"
                                id="description"
                                onFocus={() => onFocusInput(true,2)}
                                onBlur={() => onFocusInput(false,2)}
                                rows={5}
                                disabled={disabled}
                                value={ticketCurrent.description}
                                onChange={(value) => changeValue('description', value, 2)}
                            />
                        </Form.Group>
                        {((ticketCurrent.status === 'Cancelado')||(ticketCurrent.status === 'Cerrado') )&& <Form.Group className={detalleTicketCSS.contentItem}>
                            <Form.Label className={detalleTicketCSS.label} htmlFor="inputPassword5">Motivo de Cierre:</Form.Label>
                            <Form.Control
                             className={`${(disabled) ? (detalleTicketCSS.disabled && detalleTicketCSS.removeCorner) : ''}
                             ${((!statusValue[3].isValid&&statusValue[3].wasOnFocus)||(!statusValue[3].isValid&&statusForm))?detalleTicketCSS.invalidData:''}
                             ${(!statusValue[3].isValid&&statusValue[3].onFocus)?detalleTicketCSS.invalidDataOnfocus:''}
                             ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`}
                                as="textarea"
                                onFocus={() => onFocusInput(true,3)}
                                onBlur={() => onFocusInput(false,3)}
                                id="closureMotive"
                                rows={5}
                                disabled={disabled}
                                value={ticketCurrent.closureMotive}
                                onChange={(value) => changeValue('closureMotive', value, 3)}
                            />
                        </Form.Group>}
                    </Col>
                </Row>
            </div>
            {ticket.type !== 'CONSULTA' && <div className={`${detalleTicketCSS.contentTaskTickets}
             ${(taskSoporte && taskSoporte.length === 0) ? detalleTicketCSS.uninformation : ''}`}>
                {(!spinner && taskSoporte && taskSoporte.length > 0) && <div><Table responsive bordered >
                    <thead>
                        <tr className={detalleTicketCSS.tdTable}>
                            <td>Tarea</td>
                            <td>Encargado</td>
                            <td>Ir a Tarea</td>
                        </tr>
                    </thead>
                    <tbody>
                        {(taskSoporte.length > 0 )&& taskSoporte.map((task_: any, index: number) => <tr key={index}>
                            <td>
                                {task_['id'].task}
                            </td>
                            <td>
                                {task_['id'].task}
                            </td>
                            <td>
                                <FaEye className={detalleTicketCSS.goTo} onClick={() => {goToTaskProyects(task_['id'].task)}} />
                            </td>
                        </tr>)}
                    </tbody>
                </Table></div>
                
                
                }
                {spinner&&<div className={modalCSS.contentSpinner}>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div> } 
                {!spinner&&<div>
                    {(taskSoporte && (taskSoporte.length === 0)) &&
                        <Card className={detalleTicketCSS.contentCard}>
                            <CardHeader>
                                No hay Tareas Asociadas a ese Ticket
                            </CardHeader>
                        </Card>
                    }
                </div>}
            </div>}
        </div>
    )
}
