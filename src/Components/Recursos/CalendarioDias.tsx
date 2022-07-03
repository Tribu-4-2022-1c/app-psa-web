import React, {useEffect, useState} from 'react'
import ProductoSoporteCSS from  '../../Styles/ProductoSoporte.module.css'//'../ Soporte/'
import { FaPlusCircle } from 'react-icons/fa'
import { TareasEmpleados } from './TareasEmpleados';
import {TareaEmpleado} from "./TareaEmpleado";
import recursosService from "../../Services/recursosService";
import proyectosService from "../../Services/proyectosService";
import {VersionSoporte} from "../Soporte/VersionSoporte";
const CalendarioDias = (props:any) => {
    const {dia} = props;
    const {diaSelect} = props;
    const [allhoras, sethoras] = useState([]);
    useEffect(() => {
        const tasks_ = async () =>{
            let allhoras:any = recursosService.getHoursBetween(1,"2022-07-03","2022-07-09");
            sethoras(allhoras);
        }
        tasks_();
    },[]);

    const horas = [
        {
            code: 0,
            number_hours: 0,
            date: "2022-07-03",
            code_task: 0,
            code_project: 0,
            code_employee: 0
        },]



    return (
        <div>
            <div
                className={`${ProductoSoporteCSS.card} 
        ${(diaSelect&&dia&&diaSelect.id===dia.id)?ProductoSoporteCSS.isSelected:''}`}>
                <div className={ProductoSoporteCSS.contentDescription}>
                    <p>{dia['dia']} </p>
                </div>
                <div className={ProductoSoporteCSS.contentIcon} /*onClick={}*/>

                    <FaPlusCircle  />
                </div>

            </div>
            <div
                className={`${ProductoSoporteCSS.contentDescription} 
        ${(diaSelect&&dia&&diaSelect.id===dia.id)?ProductoSoporteCSS.isSelected:''}`}>
            <div>
                <TareaEmpleado fecha={horas} diaActual={dia['dia']} horas={horas} />
                </div>
            </div>
        </div>
    )
}

export default CalendarioDias;