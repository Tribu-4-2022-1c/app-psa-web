import React, { useEffect, useState } from 'react'
import { TareaEmpleado } from './TareaEmpleado';
import versionSoporteStyle from '../../Styles/VersionSoporte.module.css';
import { NavLink } from 'react-router-dom';

export const TareasEmpleados = (props:any) => {
    const {proyecto} = props;
    const {horas} = props;
    const {currentHour} = props;
    const {id} = props
  return (
    <div>
      <div className={`${versionSoporteStyle.card}`}>
              <div className={versionSoporteStyle.contentDescription}>
                  <p className={versionSoporteStyle.label}>Proyecto:</p>
                  <p className={versionSoporteStyle.descItem}>{proyecto} </p>
                  <p className={versionSoporteStyle.label}>Tarea:</p>
                  <p className={versionSoporteStyle.descItem}>{id} </p>
                  <p className={versionSoporteStyle.label}>Horas cargadas:</p>
                  <p className={versionSoporteStyle.descItem}>{horas}</p>
              </div>
      </div>
    </div>
  )
}