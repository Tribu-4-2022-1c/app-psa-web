import {Routes,Route} from "react-router-dom";
import { ProyectoProyectos } from "../Components/Proyectos/ProyectoProyectos";
import { CrearTicket } from '../Components/Soporte/CrearTicket';
import { DetalleTicket } from '../Components/Soporte/DetalleTicket';
import { Tickets } from '../Components/Soporte/Tickets';
import HomePage from '../Pages/HomePage';
import ProyectosPage from '../Pages/ProyectosPage';
import RecursosPage from '../Pages/RecursosPage';
import SoportePage from '../Pages/SoportePage';

const Public = () => {
  return (
    <Routes>
        <Route path='/' element={<ProyectosPage />} />
        <Route path='/proyectos' element={ <ProyectosPage /> } />
        <Route path='/proyectos/:id' element={ <ProyectoProyectos /> } />
        <Route path='/recursos' element={ <RecursosPage /> }/>
        <Route path='/soporte' element={ <SoportePage /> } />
        <Route path='/soporte/:product/:version' element={ <Tickets /> } />
        <Route path='/soporte/:product/:version/crear' element={ <CrearTicket /> } />
        <Route path='/soporte/ticket/detalle' element={ <DetalleTicket /> } />
        <Route path='*' element={ <HomePage /> } />
    </Routes>
  )
}

export default Public;