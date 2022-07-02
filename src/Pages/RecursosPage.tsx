import React from 'react'

import recursosService from "../Services/recursosService";
import {Empleados} from "../Components/Recursos/Empleados";

import recursosCSS from '../Styles/Recursos/Recursos.module.css';
import empleadosCSS from '../Styles/Recursos/Empleados.module.css';
import { useEffect, useState } from 'react';
import { Audio } from 'react-loader-spinner';
import {NavLink} from "react-router-dom";
import versionSoporteStyle from "../Styles/VersionSoporte.module.css";

const RecursosPage = () => {

  const [nombres, setnombres] = useState([]);
  const [load, setload] = useState(true);

  const winHeight =  window.innerHeight*.8;

  useEffect(() => {
    const getEmployees = async () => {
      let listNombres = await getAllNombres();
      setnombres(listNombres);
      setload(false);
    }
    getEmployees();

  }, []);

  const getAllNombres = async () => {
    let listNombres =  recursosService().getNombres();
    return listNombres;
  }


  function goCalendario() {

  }

  return (
    <div className={recursosCSS.content}>
      {load&&<div style={{height: winHeight}} className={`${recursosCSS.contentAudio}`}>
          <Audio
          height="50"
          width="50"
          color='#003066'
          ariaLabel='loading'
        />

        </div>}
      <div className={recursosCSS.contentButton} >
        <NavLink
            to={'/recursos/calendario'}
            className={versionSoporteStyle.styleNav}
        >
          <div className={recursosCSS.button} onClick={() => {goCalendario()}} >
            <p>CALENDARIO</p>
          </div>
        </NavLink>
      </div>
      {!load &&
          <div className={`${Empleados}`}>
            <Empleados employee={nombres} />
          </div>
      }

      </div >
  )
}

export default RecursosPage;