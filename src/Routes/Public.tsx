import React from 'react'
import {Routes,Route} from "react-router-dom";
import HomePage from '../Pages/HomePage';
import ProyectosPage from '../Pages/ProyectosPage';
import RecursosPage from '../Pages/RecursosPage';
import SoportePage from '../Pages/SoportePage';
const Public = () => {
  return (
    <Routes>
        <Route path='/' element={<ProyectosPage />} />
        <Route path='/proyectos' element={ <ProyectosPage /> } />
        <Route path='/recursos' element={ <RecursosPage /> }/>
        <Route path='/soporte' element={ <SoportePage /> } />
        <Route path='*' element={ <ProyectosPage /> } />
    </Routes>
  )
}

export default Public;