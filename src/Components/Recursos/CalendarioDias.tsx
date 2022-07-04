import React, {useEffect, useState} from 'react'
import ProductoSoporteCSS from  '../../Styles/ProductoSoporte.module.css'//'../ Soporte/'
import { FaPlusCircle } from 'react-icons/fa'
import {TareaEmpleado} from "./TareaEmpleado";
import recursosService from "../../Services/recursosService";
import {VersionSoporte} from "../Soporte/VersionSoporte";

const CalendarioDias = (props:any) => {
    const {dia} = props;
    const {diaSelect} = props;
    const {horaSelect} = props;
    const [allhoras, sethoras] = useState([]);
    const [load, setload] = useState(true);
    useEffect(() => {
        const tasks_ = async () =>{
            let allhora:any = await recursosService().getHoursBetween(1,"2022-07-03","2022-07-09");
            console.log(allhora.length)
            sethoras(allhora);
            setload(false);
        }
        tasks_();
    },[]);





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

                {(allhoras&&allhoras.length>0)&&<div>{allhoras.map( (version:any,index:number) =>
                    <TareaEmpleado fechas={allhoras} diaActual={dia['dia']} horas={allhoras}  />)}
                </div>}
            </div>
        </div>
    )
}


    export default CalendarioDias;