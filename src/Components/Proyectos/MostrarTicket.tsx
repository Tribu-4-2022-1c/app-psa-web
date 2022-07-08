import React, { useEffect, useState } from 'react'
import { TicketModel, TicketTask } from '../../models/Proyectos.models';
import ProyectoService from "../../Services/proyectosService";

const MostrarTicket = (props: any) => {
    let {unTicket} = props;

    let [ticketInfo,setTicketInfo] = useState<TicketModel>()

    useEffect(()=>{
        const proyecto_ = async () =>{
            const getTarea:any = await ProyectoService().getTicket(unTicket.id.ticket);
            setTicketInfo(getTarea);
        }
        proyecto_();
      },[]);

    return (
        <>
        <td>{ticketInfo?.code}</td>
        <td>{ticketInfo?.title}</td>
        <td>{ticketInfo?.client}</td>
        <td>{ticketInfo?.type}</td>
        <td>{ticketInfo?.severity}</td>
        </>
    )
}


export default MostrarTicket