import React, { useEffect, useState, Component } from 'react'
import { FaFilter, FaEye } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { FaCalendar, FaQuestionCircle, FaEdit, FaGofore} from 'react-icons/fa';
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
import DatePicker from "react-datepicker";

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
    'S1 - 1 DIA', 'S2 - 3 DIAS', 'S3 - 7 DIAS', 'S4 - 30 DIAS', 'S5 - 90 DIAS'
  ]

  const states = [
    'PENDIENTE', 'EN DESARROLLO', 'ESPERANDO INFORMACION DE CLIENTE', 'BLOQUEADO', 'CERRADO', 'CANCELADO'
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

  //Esto es lo que copie que seria para poder hacer click y seleccionar una fecha
  //La forma de usarlo seria pegar esto en la linea 171
  // <DatePicker selected={this.state.fecha} onChange={this.onChange}/>
  /*
  class App extends Component {
    state={
      fecha: new Date("2022", "07", "04")
    }
  }

  onChange=fecha=>{
    this.setState({fecha: fecha});
  }
  */

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
              <Form.Label className={detalleTicketCSS.labelCreate} htmlFor="inputPassword5">Descripción:</Form.Label>
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
              <div className={detalleTicketCSS.contentItemCreate}>
                <Form.Label className={detalleTicketCSS.label}>Cliente:</Form.Label>
                <Form.Select value={ticketCurrent.client} className={` 
                    ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('client',value)}>
                      {clients.map((client: any, index: number) => <option key={index} value={client}>{client}</option>)}
                </Form.Select>
              </div>
              <div className={detalleTicketCSS.contentItemCreate}>
                <Form.Label className={detalleTicketCSS.label}>Tipo:</Form.Label>
                <Form.Select value={ticketCurrent.type} className={` 
                    ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('type',value)}>
                      {typesTickets.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                </Form.Select>
              </div>
              <div className={detalleTicketCSS.contentItemCreate}>
                <Form.Label className={detalleTicketCSS.label}>Estado:</Form.Label>
                <Form.Select value={ticketCurrent.status} className={` 
                    ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('status',value)}>
                      {states.map((status: any, index: number) => <option key={index} value={status}>{status}</option>)}
                </Form.Select>
              </div>
            </Row>
          </Col>
          
          <Col className={detalleTicketCSS.col2} md={3} lg={3} m={3}>
            <Row>
              <div className={detalleTicketCSS.contentItemCreate}>
                <Form.Label className={detalleTicketCSS.label}>Responsable:</Form.Label>
                <Form.Select value={ticketCurrent.type} className={` 
                    ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('responsable',value)}>
                      {responsables.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                </Form.Select>
              </div>
              <div className={detalleTicketCSS.contentItemCreate}>
                <Form.Label className={detalleTicketCSS.label}>Severidad:</Form.Label>
                <Form.Select value={ticketCurrent.severity} className={` 
                    ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('severity',value)}>
                      {severities.map((severity: any, index: number) => <option key={index} value={severity}>{severity}</option>)}
                </Form.Select>
              </div>
              <div className={detalleTicketCSS.contentItemCreate}>
                <Form.Label className={detalleTicketCSS.label}>Fecha de Resolución:</Form.Label>
                  <Form.Control
                    className={`${detalleTicketCSS.input}`}
                    type="text"
                    id="resolution"
                    value={ticketCurrent.resolution}
                    onChange={(value)=>changeValue('resolution',value)}
                  />
                <FaCalendar className={`${detalleTicketCSS.icon}  ${detalleTicketCSS.calendar}`} />
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    
  </div>
  
)
}
