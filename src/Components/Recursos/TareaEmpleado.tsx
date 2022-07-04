import React, {useEffect, useState} from "react";

import {TareasEmpleados} from "./TareasEmpleados";
import ProductoSoporteCSS from "../../Styles/ProductoSoporte.module.css";
import {FaCalendar, FaTrash} from "react-icons/fa";
import versionSoporteStyle from "../../Styles/VersionSoporte.module.css";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import detalleProjectCSS from "../../Styles/Proyectos/Detalle.module.css";
import {Hours, HoursData} from "../../models/Recursos.models";
import RecursosService from "../../Services/recursosService";

let idHourCurrent = 0;

export const TareaEmpleado = (props:any) => {
    const {fechas} = props;
    const {diaActual} = props;
    const {currentHour} = props;
    const {index} = props;

    const diasSemana =['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']


    function diafecha(fechas:any) {
        let numero_dia = new Date(fechas["date"]).getDay();
        return diasSemana[numero_dia];
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                            <div className={versionSoporteStyle.contentIcon}  onClick={() => deleteHour(fecha)}>{diafecha(fecha) == diaActual? <FaTrash />:null }</div>
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
        </>
    )

}

