import React, { useState } from 'react'
import { TicketSoporte } from './TicketSoporte';

export const TicketsSoporte = (props:any) => {
    const {currentVersion} = props;
    const [tickets, settickets] = useState([])
    const [ticketsState, settticketsState] = useState([]);
  return (
    <div>
        <h3>TICKETS:</h3>
        {(tickets.length>0)&&(<div>{tickets.map((ticket:any,index:number) => <TicketSoporte key={index} ticket={ticket} />)}</div>)}
        {(tickets.length === 0)&&(
          <div>
            <p>No hay tickets</p>
          </div>
        )}
    </div>
  )
}
