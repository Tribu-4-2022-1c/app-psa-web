import React, {useEffect, useState} from "react";

import {TareasEmpleados} from "./TareasEmpleados";
import ProductoSoporteCSS from "../../Styles/ProductoSoporte.module.css";
import {FaCalendar, FaEdit, FaFolderOpen, FaTrash} from "react-icons/fa";
import versionSoporteStyle from "../../Styles/VersionSoporte.module.css";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import detalleProjectCSS from "../../Styles/Proyectos/Detalle.module.css";
import {Hours, HoursData} from "../../models/Recursos.models";
import RecursosService from "../../Services/recursosService";
import ProyectoService from "../../Services/proyectosService";

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
          const allProjects:any =  await ProyectoService().getAllProjects()
          setProjects(allProjects);
          idProyecto = allProjects[0].id;
          const recursos_ = async () =>{
              const allTasks: any = await ProyectoService().getTaskForProject(idProyecto.toString())
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
            const allTasks: any = await ProyectoService().getTaskForProject(idProyecto.toString())
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
        defaultProject = typesTask.findIndex((type: any, index: number) => fechas['code_project'].toString().includes(type['id']));
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
            <div className={`${versionSoporteStyle.card}` } >
                {<div>
                    {fechas.map( (fecha:any,index:number) =>
                        <div className={versionSoporteStyle.contentDescription} key={index}>{diafecha(fecha) == diaActual?<TareasEmpleados fecha={fecha["date"]} horas={fecha["number_hours"]} id={fecha["code_task"]} /> :null}
                            <div className={versionSoporteStyle.contentIcon}  
                                onClick={() => modifyHour(fecha)}>{diafecha(fecha) == diaActual? <FaEdit />:null }
                            </div>
                            <div className={versionSoporteStyle.contentIcon}  
                                onClick={() => deleteHour(fecha)}>{diafecha(fecha) == diaActual? <FaTrash />:null }
                            </div>
                        </div>
                    )}
                </div>}
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Eliminar Hora
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Está seguro de eliminar la hora seleccionada?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showModify}
                onHide={handleCloseModify}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modificar horas trabajadas
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <h4>Ingrese los datos</h4>
                <form onSubmit={handleSubmit}>
                <Row>
                    <Col className={detalleProjectCSS.col8} md={8} lg={9} m={6}>
                        <div className={detalleProjectCSS.contentItem}>
                        <Form.Label className={detalleProjectCSS.label}>Fecha trabajada:</Form.Label>

                        <FaCalendar className={`${detalleProjectCSS.icon}  ${detalleProjectCSS.calendar}`} />
                        <Form.Control
                            className={`${(disabled) ? detalleProjectCSS.disabled : ''} ${detalleProjectCSS.input}`}
                            type="text"
                            id="date"
                            disabled = {false}
                            defaultValue={cargaActual.date}
                            onChange={(value) => changeFecha('date', value)}
                        />
                        </div>
                        <div className={detalleProjectCSS.contentItem}>
                        <Form.Label className={detalleProjectCSS.label}>Proyecto:</Form.Label>
                        <div className={detalleProjectCSS.contentInput}>
                            <Form.Select value={detalleProjectCSS.type} disabled={disabled} className={` 
                                ${detalleProjectCSS.input} ${detalleProjectCSS.addRightSelect}`} defaultValue = {typesProject[0]} onChange={(e) => changeProyecto("type",e)}>
                            {typesProject.map((type: any, index: number) => <option key={index} value={type['id']} >{type['nombre']}</option>)}
                            </Form.Select>
                        </div>
                        </div>
                        <div className={detalleProjectCSS.contentItem}>
                        <Form.Label className={detalleProjectCSS.label}>Tarea:</Form.Label>
                        <div className={detalleProjectCSS.contentInput}>
                            <Form.Select value={detalleProjectCSS.type} disabled={disabled} className={` 
                                ${detalleProjectCSS.input} ${detalleProjectCSS.addRightSelect}`}  onChange={(e) => changeTarea("task",e)}>
                                {typesTask.map((type: any, index: number) => <option key={index} value={type['id']}>{type['nombre']}</option>)}
                            </Form.Select>
                        </div>
                        </div>
                        <div className={detalleProjectCSS.contentItem}>
                        <Form.Label className={detalleProjectCSS.label}>Cantidad de horas:</Form.Label>
                        <div className={detalleProjectCSS.contentInput}>
                            <Form.Select value={detalleProjectCSS.type} disabled={disabled} className={` 
                                ${detalleProjectCSS.input} ${detalleProjectCSS.addRightSelect}`} defaultValue = {cargaActual.number_hours} onChange={(e) => changeHoras("numbers_hours",e)}>
                                {number_hours.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                            </Form.Select>
                        </div>
                        </div>
                    </Col>
                </Row>
                </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={handleCloseModify}>
                    Cancelar
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmitModify}>
                    Guardar Cambios
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

