import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Ticket } from '../../models/Soporte.models';
import { ModalComponent } from '../ModalComponent';
import MenuDescription from './MenuDescription'
import soporteService from "../../Services/soporteService";
import detalleTicketCSS from '../../Styles/Detalle.module.css';
import { FaCalendar, FaEdit, FaEye, FaQuestionCircle,FaProductHunt } from 'react-icons/fa';
import { MdOutlineError, MdTipsAndUpdates, MdHighlightOff } from "react-icons/md";
import { Button, Card, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { IoCloseCircle,IoPencilSharp  } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";

export const TicketDetalle = (props: any) => {
    const location = useLocation();
    const { ticket, version, product, severities, employees }: any = location.state;
    const [flagGenerateTask, setflagGenerateTask] = useState(false);
    const [show, setshow] = useState(false);
    const [task, setTask] = useState<any[]>([]);
    const [disabled, setdisabled] = useState(true);
    const [diasRestantes, setdiasRestantes] = useState(0);
    let navigate = useNavigate();
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
    const statusTickets: any = [
        'En proceso', 'Cerrado', 'Cancelado', 'Nuevo'
    ]
    const typesTickets = [
        'CONSULTA', 'ERROR', 'MEJORA'
    ]
    const [ticketCurrent, setticketCurrent] = useState(initialTicket);
    const generateTask = () => {
        setshow(true);
    }

    const changeStateEdit = (state: boolean) => {
        if (state) {
            setticketCurrent({ ...ticket });
            getDiasDeVencimiento(ticket.severity, ticket.creationDate);
        };
        setdisabled(state);
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

    const updateData = async () => {
        const response = await soporteService().updateTicket(ticketCurrent);
        navigate(`/soporte/${product}/${version}`);
        console.log(response)
    }

    const changeValue = (prop: string, value: any) => {
        setticketCurrent({ ...ticketCurrent, [prop]: value.target.value });
    }

    const changeValueSeverities = (value: any) => {
        getDiasDeVencimiento(value.target.value, ticket.dateCreation);
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
            <Container className={detalleTicketCSS.contentRow}>
                <Row md={12}>
                    <Col className={detalleTicketCSS.col4} md={6}>
                        <Form.Group className={detalleTicketCSS.contentItem}>
                            <Form.Label className={detalleTicketCSS.label}>Cliente:</Form.Label>
                            <Form.Control
                                className={`${(disabled) ? detalleTicketCSS.disabled : ''} ${detalleTicketCSS.input}`}
                                type="text"
                                id="client"
                                disabled={disabled}
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
                                        className={`${(disabled) ? detalleTicketCSS.disabled : ''} ${detalleTicketCSS.input}`}
                                        type="text"
                                        id="resolution"
                                        disabled={disabled}
                                        value={ticketCurrent.resolution}
                                        onChange={(value) => changeValue('resolution', value)}
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
                    </Col>
                    <Col className={detalleTicketCSS.col8} md={6}>
                        {/* <div>{!disabled && (<>
                            <Button className={detalleTicketCSS.iconSave} onClick={() => updateData()} variant="success">Guardar</Button>
                            <p><MdHighlightOff className={`${detalleTicketCSS.editIcon} ${detalleTicketCSS.iconClose}`} onClick={() => changeStateEdit(true)} /></p>
                        </>)
                        }</div> */}
                        {/* <FaEdit/> */}
                        {!disabled &&  <Button className={detalleTicketCSS.iconSave} onClick={() => updateData()} variant="success">Guardar</Button>}
                        {/* {!disabled &&  <Button className={`${detalleTicketCSS.editIcon} ${detalleTicketCSS.iconClose}`} onClick={() => changeStateEdit(true)}>
                            <FaProductHunt />
                        </Button>} */}
                        {!disabled && 
                            <AiFillEdit className={`${detalleTicketCSS.editIcon} ${detalleTicketCSS.iconClose}`} onClick={() => changeStateEdit(true)} />
                       } 
                        {disabled && 
                            <FaEdit className={`${detalleTicketCSS.editIcon} ${detalleTicketCSS.iconClose}`} onClick={() => changeStateEdit(false)} />
                       } 
                       {/* <Button> </Button> */}
                        {/* <MdHighlightOff /> */}
                        {/* {disabled && <div><FaEdit className={`${detalleTicketCSS.editIcon}`} onClick={() => changeStateEdit(false)} /></div>}

                        {!disabled && <div><MdHighlightOff className={`${detalleTicketCSS.editIcon} ${detalleTicketCSS.iconClose}`} onClick={() => changeStateEdit(true)} /></div>} */}
                        <Form.Group className={detalleTicketCSS.contentItem}>
                            <Form.Label className={detalleTicketCSS.label} htmlFor="title">Título:</Form.Label>
                            <Form.Control
                                className={`${(disabled) ? (detalleTicketCSS.disabled && detalleTicketCSS.removeCorner) : ''}`}
                                as="textarea"
                                rows={2}
                                id="title"
                                disabled={disabled}
                                value={ticketCurrent.title}
                                onChange={(value) => changeValue('title', value)}
                            />
                        </Form.Group>
                        <Form.Group className={detalleTicketCSS.contentItem}>
                            <Form.Label className={detalleTicketCSS.label} htmlFor="inputPassword5">Descripción:</Form.Label>
                            <Form.Control
                                className={`${(disabled) ? (detalleTicketCSS.disabled && detalleTicketCSS.removeCorner) : ''}`}
                                as="textarea"
                                id="description"
                                rows={5}
                                disabled={disabled}
                                value={ticketCurrent.description}
                                onChange={(value) => changeValue('description', value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
            {/* <Container>
            <Row className={detalleTicketCSS.contentRow}>
        <Col className={detalleTicketCSS.col4} md={6}>
           <Row>
            <div className={detalleTicketCSS.contentItem}>
                  <Form.Label className={detalleTicketCSS.label}>Cliente:</Form.Label>
                  <Form.Control
                    className={`${(disabled) ? detalleTicketCSS.disabled : ''} ${detalleTicketCSS.input}`}
                    type="text"
                    id="client"
                    disabled={disabled}
                    value={ticketCurrent.client}
                    onChange = {(value) => changeValue('client',value)}
                  />
                </div>
                <div className={detalleTicketCSS.contentItem}>
                    <Form.Label className={detalleTicketCSS.label}>Responsable:</Form.Label>
                    <div className={detalleTicketCSS.contentInput}>
                      <Form.Select value={ticketCurrent.status} disabled={disabled} className={`${(disabled) ? detalleTicketCSS.disabled : ''} 
                      ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('status',value)}>
                        {employees.map((type: any, index: number) => <option key={type.legajo} value={type}>{type.nombre}  {type.apellido}</option>)}
                      </Form.Select>
                    </div>
                  </div>
                <div className={detalleTicketCSS.contentItem}>
                  <Form.Label className={detalleTicketCSS.label}>Fecha de creación:</Form.Label>
                  <Form.Control
                    className={`${(disabled) ? detalleTicketCSS.disabled : ''} ${detalleTicketCSS.input}`}
                    type="text"
                    id="creationDate"
                    disabled
                    value={ticketCurrent.creationDate}
                    onChange={(value) => changeValue('creationDate',value)}
                  />
                  <FaCalendar className={`${detalleTicketCSS.icon}  ${detalleTicketCSS.calendar}`} />
                </div>
                <div className={detalleTicketCSS.contentItem}>
                  <Form.Label className={detalleTicketCSS.label}>Fecha de Resolución:</Form.Label>
                  <Form.Control
                    className={`${(disabled) ? detalleTicketCSS.disabled : ''} ${detalleTicketCSS.input}`}
                    type="text"
                    id="resolution"
                    disabled={disabled}
                    value={ticketCurrent.resolution}
                    onChange={(value)=>changeValue('resolution',value)}
                  />
                  <FaCalendar className={`${detalleTicketCSS.icon}  ${detalleTicketCSS.calendar}`} />
                </div>
                <div className={detalleTicketCSS.contentItem}>
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
                </div> 
          </Row>
          <Row>
           <Col className={`${detalleTicketCSS.content_iconState}`}>
                  {ticketCurrent.type === 'ERROR' ? <MdOutlineError className={`${detalleTicketCSS.icon} 
                  ${detalleTicketCSS.error} ${detalleTicketCSS.iconState}`} /> :
                    ticketCurrent.type === 'CONSULTA' ?
                      <FaQuestionCircle className={`${detalleTicketCSS.icon}  ${detalleTicketCSS.consulta} 
                      ${detalleTicketCSS.iconState}`} /> :
                      <MdTipsAndUpdates className={`${detalleTicketCSS.icon}  ${detalleTicketCSS.update} 
                      ${detalleTicketCSS.iconState}`} />}
                </Col>
                <Col className={`${detalleTicketCSS.content_state}`}>
                  <div className={detalleTicketCSS.contentItem}>
                    <Form.Label className={detalleTicketCSS.label}>Severidad:</Form.Label>
                    <div className={detalleTicketCSS.contentInput}>
                      <Form.Select value={ticketCurrent.severity} disabled={disabled} 
                      className={`${(disabled) ? detalleTicketCSS.disabled : ''} 
                      ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => {changeValueSeverities(value); changeValue('severity',value)}}>
                        {severities.map((severitie: any, index: number) => <option key={index} value={severitie.level}>{severitie.level}-{severitie.days} dias</option>)}
                      </Form.Select>
                    </div>
                  </div>
                  <div className={detalleTicketCSS.contentItem}>
                    <Form.Label className={detalleTicketCSS.label}>Tipo:</Form.Label>
                    <div className={detalleTicketCSS.contentInput}>
                      <Form.Select value={ticketCurrent.type} disabled className={`
                      ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect} ${detalleTicketCSS.disabled}`} onChange={(value) => changeValue('type',value)}>
                        {typesTickets.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                      </Form.Select>
                    </div>
                  </div>
                  <div className={detalleTicketCSS.contentItem}>
                    <Form.Label className={detalleTicketCSS.label}>Estado:</Form.Label>
                    <div className={detalleTicketCSS.contentInput}>
                      <Form.Select value={ticketCurrent.status} disabled={disabled} className={`${(disabled) ? detalleTicketCSS.disabled : ''} 
                      ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('status',value)}>
                        {statusTickets.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                      </Form.Select>
                    </div>
                  </div>
                </Col> 
          </Row>
        </Col>
        <Col className={detalleTicketCSS.col8} md={6}>
          <Row>{!disabled && <>
            <Button className={detalleTicketCSS.iconSave} onClick={() => updateData()} variant="success">Guardar</Button>
            <MdHighlightOff className={`${detalleTicketCSS.editIcon} ${detalleTicketCSS.iconClose}`} onClick={() => changeStateEdit(true)} />
            </>
          }
          {disabled && <FaEdit className={`${detalleTicketCSS.editIcon}`} onClick={() => changeStateEdit(false)} />}
          </Row>
          <div>
                  <Form.Label className={detalleTicketCSS.label} htmlFor="title">Título:</Form.Label>
                  <Form.Control
                    className={`${(disabled) ? (detalleTicketCSS.disabled&&detalleTicketCSS.removeCorner) : ''}`}
                    as="textarea"
                    rows={2}
                    id="title"
                    disabled={disabled}
                    value={ticketCurrent.title}
                    onChange={(value) => changeValue('title',value)}
                  />
                </div>
                <div>
                  <Form.Label className={detalleTicketCSS.label} htmlFor="inputPassword5">Descripción:</Form.Label>
                  <Form.Control
                    className={`${(disabled) ? (detalleTicketCSS.disabled&&detalleTicketCSS.removeCorner) : ''}`}
                    as="textarea"
                    id="description"
                    rows={5}
                    disabled={disabled}
                    value={ticketCurrent.description}
                    onChange={(value) => changeValue('description',value)}
                  />
                </div>
        </Col>
      </Row> 
            </Container> */}
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
