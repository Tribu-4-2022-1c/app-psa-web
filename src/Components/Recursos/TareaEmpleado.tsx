import React, {useEffect, useState} from "react";

import {TareasEmpleados} from "./TareasEmpleados";


export const TareaEmpleado = (props:any) => {
    const {fechas} = props;
    const {diaActual} = props;
    const {index} = props;

    const diasSemana =['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']



    function diafecha(fechas:any) {
        let numero_dia = new Date(fechas["date"]).getDay();
        return diasSemana[numero_dia];
    }

    return (
       <div >
           {<div>{fechas.map( (fecha:any,index:number) =>
           <div key={index}>{diafecha(fecha) == diaActual?<TareasEmpleados fecha={fecha["date"]} horas={fecha["number_hours"]} id={fecha["code_task"]} />              :null}</div>
           )}</div>}
        </div>
    )

}

