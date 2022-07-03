import React, { useEffect, useState } from 'react'

import soporteCSS from "../../Styles/Soporte.module.css";
import {Audio} from "react-loader-spinner";
import CalendarioDias from "../Recursos/CalendarioDias";
import {VersionesSoporte} from "../Soporte/VersionesSoporte";

import soporteService from "../../Services/soporteService";
import recursosCSS from "../../Styles/Recursos/Recursos.module.css";
import {NavLink} from "react-router-dom";
import versionSoporteStyle from "../../Styles/VersionSoporte.module.css";


export const Calendario = (props:any) => {

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
        }

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
                    </div>
                    {!load&&dias.map((dias,index) => <div key={index}>
                        <CalendarioDias dia={dias} />
                    </div>)}
                </div >
            </div>
        </div>
    )
}
