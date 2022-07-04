import React, { useEffect, useState } from 'react'
import ProductoSoporteCSS from  '../../Styles/ProductoSoporte.module.css'//'../ Soporte/'
import { FaCalendar, FaPlusCircle } from 'react-icons/fa'
import { TareasEmpleados } from './TareasEmpleados'; 
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import detalleProjectCSS from '../../Styles/Proyectos/Detalle.module.css';
import { Hours, HoursData } from '../../models/Recursos.models';
import RecursosService from '../../Services/recursosService';
import ProyectoService from '../../Services/proyectosService';
import {ProyectoSinLider} from "../../models/Proyectos.models";

const CalendarioDias = (props:any) => {
    const {dia} = props;
    const {diaSelect} = props;

    const [disabled, setdisabled] = useState(false);
    const [elementosVacios, setElementosVacios] = useState(false);
    const [asignar_projecto, setASignarProjecto] = useState(false);
    const [typesTask, setTask] = useState([]);
    const [typesProject, setProjects] = useState([]);

    const cargaInicial: HoursData = {
        code: 0,
        number_hours: -1,
        date: '',
        code_task: -1,
        code_proyect: -1, /* Number(typesProject[1]['id']),*/
        code_employee: 1
    }

    const proyectoInicial: ProyectoSinLider = {
        id: "",
        nombre:      "",
        tipo:        "DESARROLLO",
        cliente:     "",
        alcance:     "",
        version:     "",
        descripcion: "",
        tareas:      [],
        horaEstimada: 0,
        fecha_inicio: "",
        fecha_fin:   "",
        estado:      "PENDIENTE"
    }

    const cargaFinal: Hours = {
        data: cargaInicial,
    }

    const [cargaActual, setCargaActual] = useState(cargaInicial)
    const changeValue = (prop: string, value: any) => {
        setElementosVacios(false)
        setCargaActual({ ...cargaActual, [prop]: value.target.value });
        cargaActual.code_proyect = Number(ProyectoService().getProjectByName(value.target.value))
        if (prop === "proyecto"){
            if ( value.target.value ){
                cargaActual.code_proyect = Number(ProyectoService().getProjectByName(value.target.value))
                setASignarProjecto(true)
            }
            else{
                setASignarProjecto(false)
            }
        }
      }
      
    useEffect(() => {
        const recursos_ = async () =>{
          const allProjects:any =  await ProyectoService().getAllProjects()
          setProjects(allProjects);
          console.log(allProjects)
        }
        recursos_();
      },[]);


    useEffect(() => {
        const recursos_ = async () =>{
            const allTasks: any = [];
            setTask(allTasks);
            console.log(allTasks)
        }
        recursos_();
    },[]);



    const [proyectoActual, setProyectoActual] = useState(proyectoInicial)
    const [idProyecto, setIdProyecto] = useState(0)
    const changeProyecto = (prop: string, value: any) => {
        setIdProyecto(value.target.value)
        console.log("event: ", value.target.value)
        console.log("id proyecto: ", idProyecto)
        const recursos_ = async () =>{
            const allTasks: any = await ProyectoService().getTaskForProject(idProyecto.toString())
            setTask(allTasks);
            console.log("all tasks: " ,allTasks)

        }
        recursos_();
    }
        
    const number_hours = [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
        


    const handleSubmit = (e: { preventDefault: () => void; }) =>{
        e.preventDefault()
        if (cargaActual.code_task === -1 || cargaActual.number_hours === -1 || cargaActual.date === ''){
            setElementosVacios(true)
            return false;
        }
        console.log(cargaActual)
        cargaFinal.data = cargaActual
        RecursosService().loadHours(cargaFinal)
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        < >
        <div>
            <div
                className={`${ProductoSoporteCSS.card} 
        ${(diaSelect&&dia&&diaSelect.id===dia.id)?ProductoSoporteCSS.isSelected:''}`}>
                <div className={ProductoSoporteCSS.contentDescription}>
                    <p>{dia['dia']} </p>
                </div>
                <div className={ProductoSoporteCSS.contentIcon} onClick={handleShow}>
                    <FaPlusCircle  />
                </div>
                
            </div>
            <div>
                <TareasEmpleados />
            </div>
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
                            Cargar horas trabajadas
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
                                    onChange={(value) => changeValue('date', value)}
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
                                        ${detalleProjectCSS.input} ${detalleProjectCSS.addRightSelect}`}  onChange={(e) => changeValue("task",e)}>
                                        {typesTask.map((type: any, index: number) => <option key={index} value={type['nombre']}>{type['nombre']}</option>)}
                                    </Form.Select>
                                </div>
                                </div>
                                <div className={detalleProjectCSS.contentItem}>
                                <Form.Label className={detalleProjectCSS.label}>Cantidad de horas:</Form.Label>
                                <div className={detalleProjectCSS.contentInput}>
                                    <Form.Select value={detalleProjectCSS.type} disabled={disabled} className={` 
                                        ${detalleProjectCSS.input} ${detalleProjectCSS.addRightSelect}`}  onChange={(e) => changeValue("numbers_hours",e)}>
                                        {number_hours.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                                    </Form.Select>
                                </div>
                                </div>
                            </Col>
                        </Row>
                        </form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleClose}>
                            Save Changes
                        </Button>
                        {elementosVacios &&
                        <div>
                            Hay elementos vacios
                        </div>
                        }
                        </Modal.Footer>
                    </Modal>
        </>
    )
}

export default CalendarioDias;