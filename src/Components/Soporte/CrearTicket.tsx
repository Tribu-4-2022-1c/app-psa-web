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
import { Ticket } from "../../models/Soporte.models";
import CardHeader from "react-bootstrap/esm/CardHeader";

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
    closureMotive: null,
    resolution: ''
  }

  const { product } = useParams();
  const { version } = useParams();
  const [disabled, setdisabled] = useState(true);
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
  const changeValue = (prop: string, value: any) => {
    setticketCurrent({ ...ticketCurrent, [prop]: value.target.value });
  }

  const agregarTicket = () => {
    console.log(ticketCurrent)
    let response = soporteService().postTicket(ticketCurrent);
    console.log(response)
    if (response != null) {
      navigate(`/soporte/${product}/${version}`);
    }
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

        {/* <Container className={detalleTicketCSS.contentRow}>
          <Row md={12}>
            <Col className={detalleTicketCSS.col4}>
              <div>
                <Form.Group>
                  <Form.Label className={detalleTicketCSS.label} htmlFor="title">Título:</Form.Label>
                  <Form.Control
                  />
                </Form.Group >

              </div>
              <div>
                <Form.Group>
                  <Form.Label className={detalleTicketCSS.labelCreate} htmlFor="inputPassword5">Descripción:</Form.Label>
                  <Form.Control
                    as="textarea"
                    id="description"
                    rows={5}
                    value={ticketCurrent.description}
                    onChange={(value) => changeValue('description', value)}
                  />
                </Form.Group >

              </div>
            </Col>
            <Col className={detalleTicketCSS.col8}>
              <div className={detalleTicketCSS.contentItemCreate}>
                <Form.Group className={detalleTicketCSS.contentItem}>
                  <Form.Label className={detalleTicketCSS.label}>Cliente:</Form.Label>
                  <Form.Select value={ticketCurrent.client} className={` 
                      ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('client', value)}>
                    {clients.map((client: any, index: number) => <option key={index} value={client.id}>{client.razon_social}</option>)}
                  </Form.Select>
                </Form.Group >

              </div>
              <div className={detalleTicketCSS.contentItemCreate}>
                <Form.Group className={detalleTicketCSS.contentItem}>
                  <Form.Label className={detalleTicketCSS.label}>Tipo:</Form.Label>
                  <Form.Select value={ticketCurrent.type} className={` 
                      ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('type', value)}>
                    {typesTickets.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                  </Form.Select>
                </Form.Group >

              </div>
              <div className={detalleTicketCSS.contentItemCreate}>
                <Form.Group className={detalleTicketCSS.contentItem}>
                  <Form.Label className={detalleTicketCSS.label}>Estado:</Form.Label>
                  <Form.Select value={ticketCurrent.status} className={` 
                      ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('status', value)}>
                    {statesTickets.map((status: any, index: number) => <option key={index} value={status}>{status}</option>)}
                  </Form.Select>
                </Form.Group >

              </div>
            </Col>
            <Col className={detalleTicketCSS.col2}>
              <div className={detalleTicketCSS.contentItemCreate}>
                <Form.Group className={detalleTicketCSS.contentItem}>
                  <Form.Label className={detalleTicketCSS.label}>Responsable:</Form.Label>
                  <Form.Select value={ticketCurrent.type} placeholder="Elegir Responsable" className={` 
                      ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('responsable', value)}>
                    {employees.map((employee: any, index: number) => <option key={index} value={employee.legajo}>{employee.nombre} {employee.apellido}</option>)}
                  </Form.Select>
                </Form.Group >

              </div>
              <div className={detalleTicketCSS.contentItemCreate}>
                <Form.Group className={detalleTicketCSS.contentItem}>
                  <Form.Label className={detalleTicketCSS.label}>Severidad:</Form.Label>
                  <Form.Select value={ticketCurrent.severity} className={` 
                      ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`} onChange={(value) => changeValue('severity', value)}>
                    {severities.map((severity: any, index: number) => <option key={index} value={severity.level}>{severity.level}-{severity.days}</option>)}
                  </Form.Select>
                </Form.Group >

              </div>
              <div className={detalleTicketCSS.contentItemCreate}>
                <Form.Group className={detalleTicketCSS.contentItem}>
                  <Form.Label className={detalleTicketCSS.label}>Fecha de Resolución:</Form.Label>
                  <InputGroup.Text>
                    <Form.Control
                      className={`${detalleTicketCSS.input}`}
                      type="text"
                      id="resolution"
                      value={ticketCurrent.resolution}
                      onChange={(value) => changeValue('resolution', value)}
                    />
                    <FaCalendar className={`${detalleTicketCSS.icon}  ${detalleTicketCSS.calendar}`} />
                  </InputGroup.Text>
                </Form.Group >
              </div>
            </Col>
          </Row>
        </Container> */}

    </div>

  )
}
