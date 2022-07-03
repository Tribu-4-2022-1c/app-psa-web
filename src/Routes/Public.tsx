import React from 'react';
import {Routes,Route} from "react-router-dom";
import { CrearTicket } from '../Components/Soporte/CrearTicket';
import { TicketDetalle } from '../Components/Soporte/TicketDetalle';
import { Tickets } from '../Components/Soporte/Tickets';
import { Calendario } from '../Components/Recursos/Calendario';
import HomePage from '../Pages/HomePage';
import ProyectosPage from '../Pages/ProyectosPage';
import RecursosPage from '../Pages/RecursosPage';
import SoportePage from '../Pages/SoportePage';
import LogInPage from "../Pages/LogInPage";
import { ProyectoProyectos } from '../Components/Proyectos/ProyectoProyectos';
import ProyectoCrear from '../Components/Proyectos/ProyectoCrear';

const Public = () => {
  return (
    <Routes>
        <Route path='/login' element={<LogInPage />} />
        <Route path='/proyectos' element={ <ProyectosPage /> } />
        <Route path='/proyectos/:id' element={ <ProyectoProyectos /> } />
        <Route path='/proyectos/crear_proyecto' element={ <ProyectoCrear /> } />
        <Route path='/recursos' element={ <RecursosPage /> }/>
        <Route path='/recursos/calendario' element={ <Calendario /> }/>
        <Route path='/soporte' element={ <SoportePage /> } />
        <Route path='/soporte/:product/:version' element={ <Tickets /> } />
        <Route path='/soporte/:product/:version/crear' element={ <CrearTicket /> } />
        <Route path='/soporte/ticket/detalle' element={ <TicketDetalle /> } />
        <Route path='*' element={ <HomePage /> } />
    </Routes>
  )
}

export default Public;