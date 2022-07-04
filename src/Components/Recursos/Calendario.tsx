import React, { useEffect, useState } from 'react'

import soporteCSS from "../../Styles/Soporte.module.css";
import {Audio} from "react-loader-spinner";
import CalendarioDias from "../Recursos/CalendarioDias";
import {TareaEmpleado} from "../Recursos/TareaEmpleado";

import soporteService from "../../Services/soporteService";
import recursosCSS from "../../Styles/Recursos/Recursos.module.css";
import {NavLink} from "react-router-dom";
import versionSoporteStyle from "../../Styles/VersionSoporte.module.css";
import {render} from "react-dom";


export const Calendario = (props:any) => {
    let dia_hoy=new Date();
    var day = dia_hoy.getDay(),
        diff = dia_hoy.getDate() - day + (day == 0 ? -6:1);
    let [semana, setSemana] = useState(new Date(dia_hoy.setDate(diff)));
    const [semanastring, setSemanaString] = useState(semana.getFullYear() + '-' + (semana.getMonth() + 1) + '-' + semana.getDate())

    const dia = [
        {
            dia:"Lunes",
        },
        {
            dia:"Martes",
        },
        {
            dia:"Miercoles",
        },
        {
            dia:"Jueves",
        },
        {
            dia:"Viernes",
        },{
            dia:"Sabado",
        },{
            dia:"Domingo",
        },

    ]
    const winHeight =  window.innerHeight*.8;

    const [dias, setdias] = useState(dia);
    const [load, setload] = useState(true);

    useEffect(() => {
        const getDias = async () => {
            let listDias = dias;
            setdias(dias);
            setload(false);
        }
        getDias();

    }, []);

    function goEmpleados() {
    }

    function changeDate() {
       semana.setDate(semana.getDate()+7)
        setSemanaString(semana.getFullYear() + '-' + (semana.getMonth() + 1) + '-' + semana.getDate())
        setSemana(semana)
    }



    return (
        <div>
            <div >
                <div className={soporteCSS.content}>
                    {load&&<div style={{height: winHeight}} className={`${soporteCSS.contentAudio}`}>
                        <Audio
                            height="50"
                            width="50"
                            color='#003066'
                            ariaLabel='loading'
                        />
                    </div>}
                    <div className={recursosCSS.contentButton} >
                        <NavLink
                            to={'/recursos'}
                            className={versionSoporteStyle.styleNav}
                        >
                            <div className={recursosCSS.button} onClick={() => {goEmpleados()}} >
                                <p>EMPLEADOS</p>
                            </div>
                        </NavLink>
                        <NavLink
                            to={'/recursos/calendario'}
                            className={versionSoporteStyle.styleNav}>
                        <div className={recursosCSS.button} onClick={() => {changeDate();}} >
                        <p>{semanastring}</p>

                            </div>

                        </NavLink>
                    </div>

                    {!load&&dias.map((dias,index) => <div key={index}>
                        <CalendarioDias dia={dias} semana={semana}/>

                    </div>)}
                </div >
            </div>
        </div>
    )
}

/*<NavLink
    to={'/recursos/calendario'}
    className={versionSoporteStyle.styleNav}
>
    <div className={recursosCSS.button} onClick={() => {goCalendario()}} >
        <p>CALENDARIO</p>
    </div>
</NavLink>*/