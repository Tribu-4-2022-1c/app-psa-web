import React, { useEffect, useState } from 'react'
import { TareaEmpleado } from './TareaEmpleado';
import versionSoporteStyle from "../../Styles/VersionSoporte.module.css";

export const TareasEmpleados = (props:any) => {
    const {fecha} = props;
    const {horas} = props;
    const {id} = props
  return (
    <div>
      <div>
          <div className={versionSoporteStyle.contentDescription}>
              <p className={versionSoporteStyle.label}>Codigo:</p>
              <p className={versionSoporteStyle.descItem}>{id} </p>
              <p className={versionSoporteStyle.label}>Horas:</p>
              <p className={versionSoporteStyle.descItem}>{horas}</p>
        </div>
      </div>
    </div>
  )
}