import React, { useEffect, useState, Component } from 'react'
import { FaFilter, FaEye } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { FaCalendar, FaQuestionCircle, FaEdit, FaGofore } from 'react-icons/fa';
import soporteService from '../../Services/soporteService';
import ticketsCSS from '../../Styles/Tickets.module.css';
import versionSoporteStyle from '../../Styles/VersionSoporte.module.css';
import { LoadComponent } from '../LoadComponent';
import MenuDescription from './MenuDescription';
import soporteCSS from '../../Styles/Soporte.module.css';
import { MdOutlineError, MdTipsAndUpdates, MdHighlightOff } from "react-icons/md";
import { Button, Card, Col, Container, Dropdown, DropdownButton, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom'
import detalleTicketCSS from '../../Styles/Detalle.module.css';
import moment from "moment";
import { Status, StatusTicket, Ticket } from "../../models/Soporte.models";
import CardHeader from "react-bootstrap/esm/CardHeader";
import ProductoSoporte from './ProductoSoporte';

export const CrearTicket = (props: any) => {
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

  const stateValue:Status = {
    isValid:false,
    wasOnFocus:false,
    onFocus:false
  }

  /*const initialStatus: StatusTicket = {
    code: stateValue,
    title: stateValue,
    description: stateValue,
    type: stateValue,
    client: stateValue,
    version: stateValue,
    severity: stateValue,
    status: stateValue,
    creationDate: stateValue,
    lastUpdated: stateValue,
    closureMotive: stateValue,
    resolution: stateValue,
    responsible: stateValue
  }*/
//  Array(8).fill(stateValue);
  const initialStatus:Status[] =[
    {
      isValid:true,
      wasOnFocus:false,
      onFocus:false
    },
    {
      isValid:true,
      wasOnFocus:false,
      onFocus:false
    },
    {
      isValid:false,
      wasOnFocus:false,
      onFocus:false
    },
    {
      isValid:true,
      wasOnFocus:false,
      onFocus:false
    },
    {
      isValid:true,
      wasOnFocus:false,
      onFocus:false
    },
    {
      isValid:true,
      wasOnFocus:false,
      onFocus:false
    },
    {
      isValid:false,
      wasOnFocus:false,
      onFocus:false
    },
    {
      isValid:false,
      wasOnFocus:false,
      onFocus:false
    },
    {
      isValid:false,
      wasOnFocus:false,
      onFocus:false
    }
  ]
  const { product } = useParams();
  const { version } = useParams();
  const [statusForm, setstatusForm] = useState(false);
  const [statusValue,setStatusValue] = useState<Status[]>(initialStatus);
  const [tickets, settickets] = useState([]);
  const [employees, setemployees] = useState([]);
  const [load, setload] = useState(true);
  const winHeight = window.innerHeight * .8;
  const [ticketCurrent, setticketCurrent] = useState(initialTicket);
  const [clients, setclients] = useState([]);
  const [severities, setseverities] = useState([]);
  const [typesTickets, settypesTickets] = useState([])
  const [statesTickets, setstatesTickets] = useState([])
  let navigate = useNavigate();

  const changeValue = (prop: string, value: any, indexStatus:number) => {
    let newStatusArray = [...statusValue];
    let newStatus:Status = {
      isValid:(value.target.value!=='')?true:false,
      wasOnFocus:true,
      onFocus:statusValue[indexStatus].onFocus
    }
    newStatusArray[indexStatus] = newStatus;
    setStatusValue(newStatusArray);
    setticketCurrent({ ...ticketCurrent, [prop]: value.target.value });
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

  const validateForm = () => {
    setstatusForm(true);
    let index_:number = (ticketCurrent.status!=='Cancelado')?7:8;
    let invalidData = statusValue.find( (x:Status,index:number) => {
      if(!x.isValid&&index<=index_){
        return x
      }
    });
    if(invalidData===null || invalidData===undefined) return true;
    return false;
  }

  const agregarTicket = () => {
    let status = validateForm();
    if(!status) return; 
    let response = soporteService().postTicket(ticketCurrent);
    if (response != null) {
      navigate(`/soporte/${product}/${version}`);
    }
  }

  const inicializarTicket = (allclients: any, typesTicket: any, statesTickets: any, allemployees: any, allseverities: any) => {
    if (allclients.length === 0) return;
    const version_: string = product + '_' + version;
    let initialTicket: Ticket = {
      code: 0,
      title: '',
      description: '',
      type: typesTicket[0],
      client: allclients[0]['razon_social'],
      version: version_,
      severity: allseverities[0]['level'],
      status: statesTickets[0]['value'],
      creationDate: '',
      lastUpdated: '',
      closureMotive: '',
      resolution: '',
      responsible: allemployees[0]['legajo']
    }
    setticketCurrent(initialTicket);
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
    const tickets_ = async () => {
      const allTickets: any = await soporteService().getTickets(product + '_' + version);
      const allseverities: any = await soporteService().getSeverities();
      const allemployees: any = await soporteService().getEmployees();
      const allclients: any = await soporteService().getAllClients();
      const typesTicket: any = await soporteService().getTypesTickets();
      const statesTickets: any = await soporteService().getStates();
      inicializarTicket(allclients, typesTicket, statesTickets, allemployees, allseverities);
      settickets(allTickets);
      setseverities(allseverities);
      setemployees(allemployees);
      setclients(allclients);
      setstatesTickets(statesTickets);
      settypesTickets(typesTicket);
      setload(false);
    }
    tickets_();
  }, [product, version]);



  return (
    <div>
      
      <LoadComponent load={load} winHeight={winHeight} setload soporteCSS={soporteCSS} />
      {!load && <div>
        <MenuDescription version={version} product={product} cancelTicket={true} confirmTicket={true} createTicket={agregarTicket} />
      </div>}
        {!load&&<Row md={12} className={detalleTicketCSS.content_principal}>
          <Col className={detalleTicketCSS.col4} md={6}>
            <h3 className={detalleTicketCSS.h3}>CREAR TICKET</h3>
            <Form.Group className={`${detalleTicketCSS.contentItem}`}>
              <Form.Label className={detalleTicketCSS.label}>Cliente:</Form.Label>
              <div>
                <Form.Select value={ticketCurrent.client} className={`${(!statusValue[0].isValid&&statusValue[0].wasOnFocus)?detalleTicketCSS.invalidData:''}
                        ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('client', value,0)}>
                  {clients.map((client: any, index: number) => <option key={index} value={client.razon_social}>{client.razon_social}</option>)}
                </Form.Select>
              </div>
            </Form.Group >
              <Form.Group className={detalleTicketCSS.contentItem}>
                <Form.Label className={detalleTicketCSS.label}>Responsable:</Form.Label>
                <Form.Select value={ticketCurrent.responsible} placeholder="Elegir Responsable" className={` 
                        ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('responsible', value, 1)}>
                  {employees.map((employee: any, index: number) => <option key={index} value={employee.legajo}>{employee.nombre} {employee.apellido}</option>)}
                </Form.Select>
              </Form.Group >
              <Form.Group className={detalleTicketCSS.contentItem}>
                <Form.Label className={detalleTicketCSS.label}>Fecha de Resolución:</Form.Label>
                <Form.Control
                  className={`${detalleTicketCSS.input} ${((!statusValue[2].isValid&&statusValue[2].wasOnFocus)||(!statusValue[2].isValid&&statusForm))?detalleTicketCSS.invalidData:''}
                  ${(!statusValue[2].isValid&&statusValue[2].onFocus)?detalleTicketCSS.invalidDataOnfocus:''}`}
                  onFocus={() => onFocusInput(true,2)}
                  onBlur={() => onFocusInput(false,2)}
                  type="text"
                  id="resolution"
                  value={ticketCurrent.resolution}
                  onChange={(value) => changeValue('resolution', value, 2)}
                />
                <FaCalendar className={`${detalleTicketCSS.icon}  ${detalleTicketCSS.calendar}`} />
              </Form.Group >
              <Form.Group className={detalleTicketCSS.contentItem}>
                <Form.Label className={detalleTicketCSS.label}>Severidad:</Form.Label>
                <Form.Select value={ticketCurrent.severity} className={` 
                        ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('severity', value, 3)}>
                  {severities.map((severity: any, index: number) => <option key={index} value={severity.level}>{severity.level}-{severity.days} {severity.days===1?'dia':'dias'}</option>)}
                </Form.Select>
              </Form.Group >
            <Form.Group className={detalleTicketCSS.contentItem}>
              <Form.Label className={detalleTicketCSS.label}>Tipo:</Form.Label>
              <div>
                <Form.Select value={ticketCurrent.type} className={` 
                          ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('type', value, 4)}>
                  {typesTickets.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                </Form.Select>
              </div>
            </Form.Group >
            <Form.Group className={detalleTicketCSS.contentItem}>
              <Form.Label className={detalleTicketCSS.label}>Estado:</Form.Label>
              <div>
                <Form.Select value={ticketCurrent.status} className={` 
                          ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('status', value, 5)}>
                  {statesTickets.map((status: any, index: number) => <option key={index} value={status.id}>{status.value}</option>)}
                </Form.Select>
              </div>
            </Form.Group >
          </Col>
          <Col className={detalleTicketCSS.col8} md={6}>
            <div>
              <Form.Group>
                <Form.Label className={` ${detalleTicketCSS.label}`} htmlFor="title">Título:</Form.Label>
                <Form.Control
                  className={ `${((!statusValue[6].isValid&&statusValue[6].wasOnFocus)||(!statusValue[6].isValid&&statusForm))?detalleTicketCSS.invalidData:''}
                  ${(!statusValue[6].isValid&&statusValue[6].onFocus)?detalleTicketCSS.invalidDataOnfocus:''}`}
                  as="textarea"
                  onFocus={() => onFocusInput(true,6)}
                  onBlur={() => onFocusInput(false,6)}
                  id="title"
                  rows={3}
                  value={ticketCurrent.title}
                  onChange={(value) => changeValue('title', value, 6)}
                />
              </Form.Group >
            </div>
            <div>
              <Form.Group>
                <Form.Label className={detalleTicketCSS.labelCreate} htmlFor="inputPassword5">Descripción:</Form.Label>
                <Form.Control
                  className={ `${((!statusValue[7].isValid&&statusValue[7].wasOnFocus)||(!statusValue[7].isValid&&statusForm))?detalleTicketCSS.invalidData:''}
                  ${(!statusValue[7].isValid&&statusValue[7].onFocus)?detalleTicketCSS.invalidDataOnfocus:''}`}
                  as="textarea"
                  id="description"
                  onFocus={() => onFocusInput(true,7)}
                  onBlur={() => onFocusInput(false,7)}
                  rows={5}
                  value={ticketCurrent.description}
                  onChange={(value) => changeValue('description', value, 7)}
                />
              </Form.Group >
            </div>
            {(ticketCurrent.status==='Cancelado')&&<div>
              <Form.Group>
                <Form.Label className={detalleTicketCSS.labelCreate} htmlFor="inputPassword5">Motivo de Cancelación:</Form.Label>
                <Form.Control
                className={ `${((!statusValue[8].isValid&&statusValue[8].wasOnFocus)||(!statusValue[8].isValid&&statusForm))?detalleTicketCSS.invalidData:''}
                ${(!statusValue[8].isValid&&statusValue[8].onFocus)?detalleTicketCSS.invalidDataOnfocus:''}`}
                onFocus={() => onFocusInput(true,8)}
                onBlur={() => onFocusInput(false,8)}
                  as="textarea"
                  id="closureMotive"
                  rows={5}
                  value={ticketCurrent.closureMotive}
                  onChange={(value) => changeValue('closureMotive', value, 8)}
                />
              </Form.Group >
            </div>}
          </Col>
        </Row>}
    </div>
  )
}
