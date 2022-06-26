import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { FaFilter, FaEye } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import soporteService from '../../Services/soporteService';
import ticketsCSS from '../../Styles/Tickets.module.css';
import versionSoporteStyle from '../../Styles/VersionSoporte.module.css';
import { LoadComponent } from '../LoadComponent';
import MenuDescription from './MenuDescription';
import soporteCSS from '../../Styles/Soporte.module.css';

export const Tickets = (props:any) => {
    const {product} = useParams();
    const {version} = useParams();
    const [tickets,settickets] = useState([]);
    const [severities, setseverities] = useState([]);
    const [employees, setemployees] = useState([]);
    const [clients, setclients] = useState([]);
    const [load, setload] = useState(true);
    const winHeight =  window.innerHeight*.8;
    const headsTable = [
      {
        id:"Cliente",
      },
      {
        id:"Código",
      },
      {
        id:"Estado",
      },
      {
        id:"Título",
      },
      {
        id:"Fecha de Creación",
      },
      {
        id:"Fecha de Actualización",
      },
      {
        id:"Dias Faltantes",
      },
      {
        id:"Fecha Resolución Estimada",
      },
      {
        id:"Tipo de ticket",
      },
      {
        id:"Ver Detalle",
      }
    ]

    useEffect(() => {
      const tickets_ = async () =>{
        const allTickets:any = await soporteService().getAllTickets();
        const allseverities:any = await soporteService().getSeverities();
        const allemployees:any = await soporteService().getEmployees();
        const allclients :any = await soporteService().getAllClients();
        settickets(allTickets);
        setseverities(allseverities);
        setemployees(allemployees);
        setclients(allclients);
        setload(false);
      }
      tickets_();
    },[]);

    const getDays = (severity:string,fecha:string) => {
      return "6";
    }

    const isConsulta = (typeTicket:string) =>{
      return typeTicket==='CONSULTA';
    }

    const isError = (typeTicket:string) => {
      return typeTicket==='ERROR';
    }
  return (
    <div>
      <LoadComponent load={load} winHeight={winHeight} setload soporteCSS={soporteCSS} />
      {!load&&<div>
        <MenuDescription version={version} product={product} />
        <Table responsive bordered >
          <thead>
            <tr >
              {headsTable&&headsTable.map((head,index) => <th key={index}>
                <div className={ticketsCSS.contentFilter}>
                  <p>{head.id}</p>
                  {index!=(headsTable.length-1)&&
                  <p><FaFilter/></p>}
                </div>
              </th>)}
            </tr>
          </thead>
          <tbody>
            {(tickets)&&tickets.map( (ticket,index) => <tr key={index}>
              <td>{ticket['client']}</td>
              <td>{ticket['code']}</td>
              <td>{ticket['status']}</td>
              <td>{ticket['title']}</td>
              <td>{ticket['creationDate']}</td>
              <td>{ticket['lastUpdated']}</td>
              <td>{getDays(ticket['severity'],ticket['creationDate'])}</td>
              <td>{ticket['resolution']}</td>
              <td className={`${isError(ticket['type'])?ticketsCSS.error:isConsulta(ticket['type'])?ticketsCSS.consulta:ticketsCSS.default}`}>{ticket['type']}</td>
              <td className={`${ticketsCSS.contentIcon} `}>
                <Link className={versionSoporteStyle.styleNav} 
                  to={`/soporte/ticket/detalle`} 
                  state={{ ticket,version,product,severities }}>
                  <FaEye />
                </Link>
              </td>
            </tr>)}
          </tbody>
        </Table>
      </div> } 
    </div>
    
  )
}
