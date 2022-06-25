import React, { useEffect, useState } from "react";
import { FaCalendar, FaQuestionCircle, FaEdit } from 'react-icons/fa';
import { MdOutlineError, MdTipsAndUpdates, MdHighlightOff } from "react-icons/md";
import { Button, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import { useLocation,useNavigate } from 'react-router-dom'
import MenuDescription from './MenuDescription';
import detalleTicketCSS from '../../Styles/Detalle.module.css';
import moment from "moment";
import { Ticket } from "../../models/Soporte.models";
import soporteService from "../../Services/soporteService";


export const DetalleTicket = () => {

  const initialTicket:Ticket = {
    code:          0,
    title:         '',
    description:   '',
    type:          '',
    client:        '',
    version:       '',
    severity:      '',
    status:        '',
    creationDate:  '',
    lastUpdated:   '',
    closureMotive: null,
    resolution:    ''
  }
  const typesTickets = [
    'CONSULTA', 'ERROR', 'MEJORA'
  ]
  const location = useLocation();
  let navigate = useNavigate();
  const { ticket, version, product, severities }: any = location.state;
  const [disabled, setdisabled] = useState(true);
  const [ticketCurrent, setticketCurrent] = useState(initialTicket);
  const [diasRestantes, setdiasRestantes] = useState(0);

  const getDiasDeVencimiento = (severity: string, dateCreation: string) => {
    let fecha1 = moment(dateCreation);
    let fecha2 = moment();
    let optionSev = severities.find((x: any) => x.level === severity);
    let diffDate = fecha2.diff(fecha1, 'days');
    setdiasRestantes(optionSev.days - diffDate);
  }
  

  const changeStateEdit = (state:boolean) => {
    if(state){
      setticketCurrent({...ticket});
      getDiasDeVencimiento(ticket.severity, ticket.creationDate);
    };
    setdisabled(state);
  }

  const changeValue = (prop:string,value: any) => {
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

  useEffect(() => {
    return () => {
      setticketCurrent({ ...ticket });
      getDiasDeVencimiento(ticket.severity, ticket.creationDate);
    }
  }, [ticket])


  return (
    <div>
      <MenuDescription version={version} product={product} />
      <div>
        <Row className={detalleTicketCSS.contentRow}>
          <Col className={detalleTicketCSS.col4} md={6} lg={6} m={6}>
            <Row>
              <div className={detalleTicketCSS.contentItem}>
                <Form.Label className={detalleTicketCSS.label}>Responsable:</Form.Label>
                <Form.Control
                  className={`${(disabled) ? detalleTicketCSS.disabled : ''} ${detalleTicketCSS.input}`}
                  type="text"
                  id="responsable"
                  disabled={disabled}
                  value={ticketCurrent.client}
                  onChange={(value) => changeValue('ticketCurrent',value)}
                />
              </div>
              <div className={detalleTicketCSS.contentItem}>
                <Form.Label className={detalleTicketCSS.label}>Cliente:</Form.Label>
                <Form.Control
                  className={`${(disabled) ? detalleTicketCSS.disabled : ''} ${detalleTicketCSS.input}`}
                  type="text"
                  id="inputPassword5"
                  disabled={disabled}
                  value={ticketCurrent.client}
                  onChange = {(value) => changeValue('client',value)}
                />
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
                <Form.Label className={detalleTicketCSS.label}>Dias de vencimiento:</Form.Label>
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
                    className={`${(disabled) ? detalleTicketCSS.disableds : ''} 
                    ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => {changeValueSeverities(value); changeValue('severity',value)}}>
                      {severities.map((severitie: any, index: number) => <option key={index} value={severitie.level}>{severitie.level}</option>)}
                    </Form.Select>
                  </div>
                </div>
                <div className={detalleTicketCSS.contentItem}>
                  <Form.Label className={detalleTicketCSS.label}>Tipo:</Form.Label>
                  <div className={detalleTicketCSS.contentInput}>
                    <Form.Select value={ticketCurrent.type} disabled={disabled} className={` 
                    ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('type',value)}>
                      {typesTickets.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                    </Form.Select>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col className={detalleTicketCSS.col8} md={6} lg={6} m={6}>
            {!disabled&&<Button className={detalleTicketCSS.iconSave} onClick={() => updateData()} variant="success">Guardar</Button>}
            {!disabled&&<MdHighlightOff className={`${detalleTicketCSS.editIcon} ${detalleTicketCSS.iconClose}`} onClick={() => changeStateEdit(true)} />}
            {disabled&&<FaEdit className={`${detalleTicketCSS.editIcon}`} onClick={() => changeStateEdit(false)} />}
            <Row>
              <Col>
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
          </Col>
        </Row>
      </div>
    </div>
  )
}
