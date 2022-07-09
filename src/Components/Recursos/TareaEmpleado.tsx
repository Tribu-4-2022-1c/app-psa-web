import React, {useEffect, useState} from "react";

import {TareasEmpleados} from "./TareasEmpleados";
import {FaCalendar, FaEdit, FaFolderOpen, FaTrash} from "react-icons/fa";
import versionSoporteStyle from "../../Styles/VersionSoporte.module.css";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import detalleProjectCSS from "../../Styles/Proyectos/Detalle.module.css";
import {Hours, HoursData} from "../../models/Recursos.models";
import RecursosService from "../../Services/recursosService";

let idHourCurrent = 0;
let idProyecto = 0;
let idTarea = 0;
let fechaCarga = " ";
let numeroHorasCarga = 1;
let defaultProject = 0;

export const TareaEmpleado = (props:any) => {
    const {fechas} = props;
    const {diaActual} = props;
    const {currentHour} = props;
    const {index} = props;

    const diasSemana =['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']

    const cargaInicial: HoursData = {
        code: 0,
        number_hours: -1,
        date: '',
        code_task: -1,
        code_project: -1, /* Number(typesProject[1]['id']),*/
        code_employee: 1
    }


    function diafecha(fechas:any) {
        let numero_dia = new Date(fechas["date"]).getDay();
        return diasSemana[numero_dia];
    }

    const cargaFinal: Hours = {
        data: cargaInicial,
    }

    const [cargaActual, setCargaActual] = useState(cargaInicial)
    const [disabled, setdisabled] = useState(false);
    const [elementosVacios, setElementosVacios] = useState(false);
    const [typesTask, setTask] = useState([]);
    const [typesProject, setProjects] = useState([]);

    useEffect(() => {
        const recursos_ = async () =>{
          const allProjects:any =  await RecursosService().getAllProjects()
          setProjects(allProjects);
          idProyecto = allProjects[0].id;
          const recursos_ = async () =>{
              const allTasks: any = await RecursosService().getTaskForProject(idProyecto.toString())
              setTask(allTasks);
          }
          recursos_();
        }
        recursos_();
      },[]);


    useEffect(() => {
        const recursos_ = async () =>{
            const allTasks: any = [];
            setTask(allTasks);
        }
        recursos_();
    },[]);


    const changeProyecto = (prop: string, value: any) => {
        idProyecto = value.target.value;
        cargaActual.code_project = idProyecto;
        setCargaActual(cargaActual);
        const recursos_ = async () =>{
            const allTasks: any = await RecursosService().getTaskForProject(idProyecto.toString())
            setTask(allTasks);
        }
        recursos_();
    }

    const changeTarea = (prop: string, value: any) => {
        cargaActual.code_task = value.target.value;
        setCargaActual(cargaActual);
    }

    const changeFecha = (prop: string, value: any) => {
        cargaActual.date = value.target.value;
        setCargaActual(cargaActual);
    }

    const changeHoras = (prop: string, value: any) => {
        console.log(cargaActual);
        cargaActual.number_hours = value.target.value;
        setCargaActual(cargaActual);
    }

    const number_hours = [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]

    const handleSubmitModify = async (e: { preventDefault: () => void; }) =>{
        e.preventDefault()
        console.log("carga actual: ", cargaActual)
        let hours: HoursData = {
            code: idHourCurrent,
            number_hours: cargaActual.number_hours,
            date: cargaActual.date,
            code_task: cargaActual.code_task,
            code_project: cargaActual.code_project,
            code_employee: 1
        }
        let carga: Hours = {
            data: hours,
        }
        const response = await RecursosService().modifyHours(carga);
        if(response) {
            window.location.reload();
        }
        handleClose();
    }


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModify, setShowModify] = useState(false);

    const handleCloseModify = () => setShowModify(false);
    const handleShowModify = () => setShowModify(true);

    const modifyHour = (fechas:any) => {
        console.log("modify: ", fechas['code']);
        idHourCurrent = fechas['code'];
        cargaInicial.code = fechas['code'];
        cargaInicial.number_hours = fechas['number_hours'];
        cargaInicial.date = fechas['date'];
        cargaInicial.code_task = fechas['code_task'];
        cargaInicial.code_project = fechas['code_project'];
        cargaInicial.code_employee = fechas['code_employee'];
        setCargaActual(cargaInicial);
        //defaultProject = typesTask.findIndex((type: any, index: number) => fechas['code_project'].toString().includes(type['id']));
        handleShowModify();
    }

    const deleteHour = (fechas:any) => {
        console.log("delete: ", fechas['code']);
        idHourCurrent = fechas['code'];
        handleShow();
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const response = await RecursosService().deleteHours(idHourCurrent);
        if (response) {
            window.location.reload();
        }
        handleClose();
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

