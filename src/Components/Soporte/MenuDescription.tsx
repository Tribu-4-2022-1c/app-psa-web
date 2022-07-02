import React from 'react'
import ticketsCSS from "../../Styles/Tickets.module.css";

const MenuDescription = (props:any) => {

  const {product,version,flagGenerateTask, functionGenerateTask, flagNuevoTicket, cancelTicket, confirmTicket, createTicket} = props;

  return (
    <div className={ticketsCSS.contentDetail}>
        <div className={ticketsCSS.contenDescription}>
          <div className={ticketsCSS.item}>
            <p className={ticketsCSS.label}>PRODUCTO:</p>
            <p className={ticketsCSS.input}>{product}</p>
          </div>
          <div className={ticketsCSS.item}>
            <p className={ticketsCSS.label}>VERSION:</p>
            <p className={ticketsCSS.input}>{version}</p>
          </div>
        </div>
        <div className={ticketsCSS.contentButton}>
          {flagNuevoTicket&&<div className={ticketsCSS.button}>
            <p>NUEVO TICKET</p>
          </div>}
          {flagGenerateTask&&<div className={ticketsCSS.button} onClick={functionGenerateTask}>
            <p>NUEVA TAREA</p>
          </div>}
          {cancelTicket&&<div className={ticketsCSS.buttonError}>
            <p>CANCELAR</p>
          </div>}
          {confirmTicket&&<div className={ticketsCSS.buttonConfirm} onClick={createTicket}>
            <p>CONFIRMAR</p>
          </div>}
        </div>     
      </div>
  )
}

export default MenuDescription;