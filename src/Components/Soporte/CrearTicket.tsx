import React, { useEffect, useState } from 'react'
import { FaFilter, FaEye } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import soporteService from '../../Services/soporteService';
import ticketsCSS from '../../Styles/Tickets.module.css';
import versionSoporteStyle from '../../Styles/VersionSoporte.module.css';
import { LoadComponent } from '../LoadComponent';
import MenuDescription from './MenuDescription';
import soporteCSS from '../../Styles/Soporte.module.css';
import { MdOutlineError, MdTipsAndUpdates, MdHighlightOff } from "react-icons/md";
import { Button, Card, Col, Dropdown, DropdownButton, Form, Row, Table } from 'react-bootstrap';
import { useLocation,useNavigate } from 'react-router-dom'
import detalleTicketCSS from '../../Styles/Detalle.module.css';
import moment from "moment";
import { Ticket } from "../../models/Soporte.models";
import CardHeader from "react-bootstrap/esm/CardHeader";

export const CrearTicket = (props:any) => {
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

  const severities = [
    'S1 - 24 horas', 'S2 - 72 horas', 'S3 - 7 dias', 'S4 - 30 dias', 'S5 - 90 dias'
  ]

  const clients = [
    ' '
  ]

  const responsables = [
    ' '
  ]

  const {product} = useParams();
  const {version} = useParams();
  const [disabled, setdisabled] = useState(true);
  const [tickets,settickets] = useState([]);
  const [employees, setemployees] = useState([]);
  const [load, setload] = useState(true);
  const winHeight =  window.innerHeight*.8;
  const [ticketCurrent, setticketCurrent] = useState(initialTicket);

  const changeValue = (prop:string,value: any) => {
    setticketCurrent({ ...ticketCurrent, [prop]: value.target.value });
  }

  

  useEffect(() => {
    const tickets_ = async () =>{
      const allTickets:any = await soporteService().getTickets(product+'_'+version);
      const allseverities:any = await soporteService().getSeverities();
      const allemployees:any = await soporteService().getEmployees();
      const allclients :any = await soporteService().getAllClients();
      settickets(allTickets);
      setemployees(allemployees);
      setload(false);
    }
    tickets_();
  },[]);


  
return (
  <div>
    <LoadComponent load={load} winHeight={winHeight} setload soporteCSS={soporteCSS} />
    {!load&&<div>
      <MenuDescription version={version} product={product} cancelTicket={true} confirmTicket={true}/>
    </div> } 

    <div>
        <Row className={detalleTicketCSS.contentRow}>
        <Col className={detalleTicketCSS.col4} md={6} lg={6} m={6}>
          <Row>
            <Col>
            <div>
              <Form.Label className={detalleTicketCSS.label} htmlFor="title">Título:</Form.Label>
              <Form.Control
              />
            </div>
            <div>
              <Form.Label className={detalleTicketCSS.label} htmlFor="inputPassword5">Descripción:</Form.Label>
              <Form.Control
                  as="textarea"
                  id="description"
                  rows={5}
                  value={ticketCurrent.description}
                  onChange={(value) => changeValue('description',value)}
                />
            </div>
            </Col>
          </Row>
          </Col>
          <Col className={detalleTicketCSS.col8} md={3} lg={3} m={3}>
            <Row>
              <div className={detalleTicketCSS.contentItem}>
                <Form.Label className={detalleTicketCSS.label}>Cliente:</Form.Label>
                <Form.Select value={ticketCurrent.type} className={` 
                    ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('client',value)}>
                      {clients.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                </Form.Select>
              </div>
              <div className={detalleTicketCSS.contentItem}>
                <Form.Label className={detalleTicketCSS.labelCreate}>Tipo:</Form.Label>
                <Form.Select value={ticketCurrent.type} className={` 
                    ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('type',value)}>
                      {typesTickets.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                </Form.Select>
              </div>
            </Row>
          </Col>
          <Col className={detalleTicketCSS.col2} md={3} lg={3} m={3}>
            <Row>
              <div className={detalleTicketCSS.contentItem}>
                <Form.Label className={detalleTicketCSS.label}>Responsable:</Form.Label>
                <Form.Select value={ticketCurrent.type} className={` 
                    ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('responsable',value)}>
                      {responsables.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                </Form.Select>
              </div>
              <div className={detalleTicketCSS.contentItem}>
                <Form.Label className={detalleTicketCSS.labelCreate}>Severidad:</Form.Label>
                <Form.Select value={ticketCurrent.type} className={` 
                    ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('severity',value)}>
                      {severities.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                </Form.Select>
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    
  </div>
  
)
}
