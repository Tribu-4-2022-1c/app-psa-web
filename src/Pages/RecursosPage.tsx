import React from 'react'

import recursosService from "../Services/recursosService";
import {Empleados} from "../Components/Recursos/Empleados";

import recursosCSS from '../Styles/Recursos/Recursos.module.css';
import empleadosCSS from '../Styles/Recursos/Empleados.module.css';
import { useEffect, useState } from 'react';
import soporteService from '../Services/soporteService';
import { VersionesSoporte } from '../Components/Soporte/VersionesSoporte';
import ProductoSoporte from '../Components/Soporte/ProductoSoporte';
import LoginButton from '../Components/Recursos/LoginButton';
import { Audio } from 'react-loader-spinner';
import loginButton from "../Components/Recursos/LoginButton";

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
        {!load &&

      <div >
         <LoginButton loginButton={loginButton} />
      </div>

      }

        {!load &&

            <div className={`${recursosCSS.titulo}`}>
              Listado de Recursos
            </div>

        }
      {!load &&
          <div className={`${Empleados}`}>
            <Empleados employee={nombres} />
          </div>
      }

      </div >
  )
}

export default RecursosPage;