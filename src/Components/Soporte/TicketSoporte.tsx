import React from 'react'
import { FaTicketAlt } from 'react-icons/fa';
import { IoFolderOpen, IoLockClosed, IoWarningSharp } from 'react-icons/io5';
import { RiErrorWarningFill } from 'react-icons/ri';
import ticketCSS from '../Soporte/TicketSoporte.module.css'
export const TicketSoporte = (props:any) => {
    const {data} = props;
  return (
    <div className={ticketCSS.card}>
            <div>
              <div className={ticketCSS.contentItem}>
                <p className={ticketCSS.label}>Ticket:</p>
                <p className={ticketCSS.descItem}>{data.id}</p>
              </div>
              <div className={ticketCSS.contentItem}>
                <p className={ticketCSS.label}>Estado:</p>
                <p className={ticketCSS.descItem}>{data.estado}</p>
              </div>
              <div className={ticketCSS.contentItem}>
                <p className={ticketCSS.label}>Fecha de Creación:</p>
                <p className={ticketCSS.descItem}>{data.fechaCreacion}</p>
              </div>
              <div className={ticketCSS.contentItem}>
                <p className={ticketCSS.label}>Hora:</p>
                <p className={ticketCSS.descItem}>{data.hora}</p>
              </div>
              <div className={ticketCSS.contentItem}>
                <p className={ticketCSS.label}>Tipo:</p>
                <p className={ticketCSS.descItem}>{data.tipo}</p>
              </div>
            </div>
            <div className={ticketCSS.contentIcon}>
              <FaTicketAlt />
              <RiErrorWarningFill />
              <IoFolderOpen />
              <IoLockClosed />
              <IoWarningSharp />
            </div>
          </div>
  )
}
