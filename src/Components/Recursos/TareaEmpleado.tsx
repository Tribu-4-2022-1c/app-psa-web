import React, {useEffect, useState} from "react";
import recursosService from "../../Services/recursosService";
import versionSoporteStyle from "../../Styles/VersionSoporte.module.css";
import {NavLink} from "react-router-dom";
import {FaFolderOpen, FaPlusCircle} from "react-icons/fa";
import {TareasEmpleados} from "./TareasEmpleados";

export const TareaEmpleado = (props:any) => {
    const {fecha} = props;
    const {diaActual} = props;
    const {horas} = props;
    const {id} = props;

    const diasSemana =['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']



    function diafecha(fecha:any) {
        let numero_dia = new Date(fecha["date"]).getDay();
        return diasSemana[numero_dia];
    }

    return (
       <div >
           {diafecha(fecha) == diaActual?
               <TareasEmpleados fecha={fecha["date"]} horas={horas["number_hours"]} id={"1"}/>              :null}
        </div>
    )

}