import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { FaSortAmountDown, FaEye } from 'react-icons/fa';
import { Link, NavLink, useParams } from 'react-router-dom';
import recursosService from '../../Services/recursosService';
import empleadosCSS from "../../Styles/Empleados.module.css";
import versionSoporteStyle from "../../Styles/VersionSoporte.module.css";
import LoginButton from "./LoginButton";
import loginButton from "./LoginButton";


export const Calendario = (props:any) => {
    const {product} = useParams();
    const {version} = useParams();
    const [nombre, setnombre] = useState([]);
    const [apellido, setapellido] = useState([]);
    const [legajo, setlegajo] = useState([]);
    

    useEffect(() => {
        const recursos_ = async () =>{
            const allNombres:any = await recursosService().getNombres();
            const allApellidos:any = await recursosService().getApellidos();
            const allLegajos:any = await recursosService().getLegajos();
            setnombre(allNombres);
            /*setapellido(allApellidos)
            setlegajo(allLegajos)*/
        }
        recursos_();
    },[]);

   

    return (
        <div>
            <div >
                <LoginButton loginButton={loginButton} />
            </div>
        </div>
    )
}
