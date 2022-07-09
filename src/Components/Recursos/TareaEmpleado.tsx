import React, {useEffect, useState} from "react";

import {TareasEmpleados} from "./TareasEmpleados";
import versionSoporteStyle from "../../Styles/VersionSoporte.module.css";


export const TareaEmpleado = (props:any) => {
    const {fechas} = props;
    const {diaActual} = props;
    const {currentHour} = props;
    const {index} = props;

    const diasSemana =['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']



    function diafecha(fechas:any) {
        let numero_dia = new Date(fechas["date"]).getDay();
        return diasSemana[numero_dia];
    }

    return (
        <>
            <div className={`${versionSoporteStyle.card2}` } >
                    {fechas.map( (fecha:any,index:number) =>
                        <div className={versionSoporteStyle.contentDescriptionRecursos} key={index}>{diafecha(fecha) == diaActual?<TareasEmpleados proyecto={fecha["project"]} horas={fecha["number_hours"]} id={fecha["task"]} fecha={fecha} /> :null}
                        </div>
                    )}
            </div>

        </>
    )

}

