import {Routes,Route} from "react-router-dom";
import { CrearTicket } from '../Components/Soporte/CrearTicket';
import { DetalleTicket } from '../Components/Soporte/DetalleTicket';
import { Tickets } from '../Components/Soporte/Tickets';
import { Calendario } from '../Components/Recursos/Calendario';
import HomePage from '../Pages/HomePage';
import ProyectosPage from '../Pages/ProyectosPage';
import RecursosPage from '../Pages/RecursosPage';
import SoportePage from '../Pages/SoportePage';
import LogInPage from "../Pages/LogInPage";

const Public = () => {
  return (
    <Routes>
        <Route path='/' element={<LogInPage />} />
        <Route path='/proyectos' element={ <ProyectosPage /> } />
        <Route path='/recursos' element={ <RecursosPage /> }/>
        <Route path='/recursos/calendario' element={ <Calendario /> }/>
        <Route path='/soporte' element={ <SoportePage /> } />
        <Route path='/soporte/:product/:version' element={ <Tickets /> } />
        <Route path='/soporte/:product/:version/crear' element={ <CrearTicket /> } />
        <Route path='/soporte/ticket/detalle' element={ <DetalleTicket /> } />
        <Route path='*' element={ <HomePage /> } />
    </Routes>
  )
}

export default Public;