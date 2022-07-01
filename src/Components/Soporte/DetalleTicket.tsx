import React from 'react'

export const DetalleTicket = () => {
  return (
    <div>DetalleTicket</div>
  )
}

{/* import React, { useCallback, useEffect, useState } from "react";
import { FaCalendar, FaQuestionCircle, FaEdit, FaEye } from 'react-icons/fa';
import { MdOutlineError, MdTipsAndUpdates, MdHighlightOff } from "react-icons/md";
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom'
import MenuDescription from './MenuDescription';
import detalleTicketCSS from '../../Styles/Detalle.module.css';
import moment from "moment";
import { Ticket } from "../../models/Soporte.models";
import soporteService from "../../Services/soporteService";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { ModalComponent } from "../ModalComponent";


export const DetalleTicket = () => {

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
  const location = useLocation();
  let navigate = useNavigate();
  const { ticket, version, product, severities, employees }: any = location.state;
  const [disabled, setdisabled] = useState(true);
  const [ticketCurrent, setticketCurrent] = useState(initialTicket);
  const [diasRestantes, setdiasRestantes] = useState(0);
  const [task, setTask] = useState<any[]>([]);
  const [flagGenerateTask, setflagGenerateTask] = useState(false);
  const [show, setshow] = useState(false);

  const getDiasDeVencimiento = useCallback((severity: string, dateCreation: string) => {
    let fecha1 = moment(dateCreation);
    let fecha2 = moment();
    let optionSev = severities.find((x: any) => x.level === severity);
    let diffDate = fecha2.diff(fecha1, 'days');
    setdiasRestantes(optionSev.days - diffDate);
  }, [severities])

  const changeStateEdit = (state: boolean) => {
    if (state) {
      setticketCurrent({ ...ticket });
      getDiasDeVencimiento(ticket.severity, ticket.creationDate);
    };
    setdisabled(state);
  }

  const changeValue = (prop: string, value: any) => {
    setticketCurrent({ ...ticketCurrent, [prop]: value.target.value });
  }

  const changeValueSeverities = (value: any) => {
    getDiasDeVencimiento(value.target.value, ticket.dateCreation);
  }

  const updateData = async () => {
    const response = await soporteService().updateTicket(ticketCurrent);
    navigate(`/soporte/${product}/${version}`);
    console.log(response)
  }

  const validateFlagGenerateTask = useCallback(() => {
    if (ticket.type !== 'CONSULTA') {
      setflagGenerateTask(true);
    }
  }, [ticket])

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
    <>
      <MenuDescription version={version} product={product} flagGenerateTask={flagGenerateTask} functionGenerateTask={generateTask} />
      <ModalComponent show={show} employees={employees} closeModal={closeModal} agregarTarea={agregarTarea}/>
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
    </>
  )
}*/}
