import { parse } from 'node:path/win32';
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'


export const DetalleTicket = () => {
  //const {ticket}:any = useParams();
  const location = useLocation();
  const { ticket }:any = location.state;

  const getJson =(ticket:any) => {
    return ticket['client'] //"JSON.parse(ticket)"
  }
  return (
    <div>{ticket.code}</div>
  )
}
