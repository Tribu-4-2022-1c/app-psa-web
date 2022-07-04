import React, { useEffect, useState } from 'react'
import { Button,FloatingLabel,Form,Modal, Spinner} from 'react-bootstrap'
import { Status, Task, TaskSoporte } from '../models/Soporte.models';
import soporteService from '../Services/soporteService';
import modalCSS from '../Styles/Modal.module.css';
import detalleTicketCSS from '../Styles/Detalle.module.css';

export const ModalComponent = (props: any) => {
    const initialTaskData:Task = {
        id:              0,
        horasEstimadas:  0,
        nombre:          '',
        recursoAsignado: {
            name: '',
        },
        estado:          'Pendiente',
        prioridad:       '',
        objetivo:        '',
        proyectoID:      0
    }
    const prioridad = [
        'Alta',
        'Baja',
        'Media'
      ]
      const initialStatus: Status[] = [
        {
            isValid: false,
            wasOnFocus: false,
            onFocus: false
        },
        {
            isValid: false,
            wasOnFocus: false,
            onFocus: false
        },
        {
            isValid: false,
            wasOnFocus: false,
            onFocus: false
        }
    ]
    const { employees, show, closeModal,agregarTarea, proyects, currentTicket } = props;
    const [statusValue, setStatusValue] = useState<Status[]>(initialStatus);
    const [spinner,setSpinner] = useState(false);
    const [newTarea, setnewTarea] = useState(initialTaskData);
    const [statusForm, setstatusForm] = useState(false);
    const agregarTareaNueva = async () => {
        console.log(newTarea)
        let status = validateForm();
        console.log(status)
        if (!status) return;
        setSpinner(true);
        let response:any = await soporteService().addTaskProyectos(newTarea);
        if(!response) return;
        let bodyTask:TaskSoporte = {
            ticket: currentTicket.code,
            task:  response['id'],
        }
        let responseSoporte = await soporteService().saveTaskSoporte(bodyTask);
        setSpinner(false);
        agregarTarea(newTarea);
    }

    const changeState = (prop:string,value:any,indexStatus:any=null) => {
        if(indexStatus!==null){
            let newStatusArray = [...statusValue];
            let newStatus: Status = {
                isValid: (value.target.value !== '') ? true : false,
                wasOnFocus: true,
                onFocus: statusValue[indexStatus].onFocus
            }
            newStatusArray[indexStatus] = newStatus;
            setStatusValue(newStatusArray);
            console.log(newStatusArray)    
        }
        console.log("changeState")
        setnewTarea({ ...newTarea, [prop]: value.target.value });
    }

    const validateForm = () => {
        setstatusForm(true);
        let invalidData = statusValue.find((x: Status, index: number) => {
            if (!x.isValid) {
                return x
            }
        });
        if (invalidData === null || invalidData === undefined) return true;
        return false;
    }

    const onFocusInput = (state:boolean,indexStatus:number) => {
        let newStatusArray = [...statusValue];
        let newStatus:Status = {
          isValid:statusValue[indexStatus].isValid,
          wasOnFocus:true,
          onFocus:state
        }
        newStatusArray[indexStatus] = newStatus;
        setStatusValue(newStatusArray);
      }

    const closeModal_ = () => {
        
    }

    useEffect(() => {
      const initializeData = () => {
        let data = initialTaskData;
        data.proyectoID = (proyects&&proyects.length>0)?proyects[0].id:'';
        data.recursoAsignado.name = (employees&&employees.length>0)?employees[0].legajo:'';
        data.prioridad=prioridad[0];
        setnewTarea(data);
      }
      initializeData();
    }, [])

    useEffect(() => {
        const initializeData = () => {
            setstatusForm(false);
            setStatusValue(initialStatus);
            let data = initialTaskData;
            data.proyectoID =(proyects&&proyects.length>0)?proyects[0].id:'';
            data.recursoAsignado.name = (employees&&employees.length>0)?employees[0].legajo:'';
            data.prioridad=prioridad[0];
            setnewTarea(data);
        }
        
        initializeData();
      }, [show])

    return (
        <div>
            <div>
                <Modal show={show} onHide={closeModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title className={modalCSS.titleTarea}>Nueva Tarea</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {!spinner&&<div><FloatingLabel controlId="floatingTextarea2" label="Titulo" className={modalCSS.labelSelect}>
                            <Form.Control
                            className={`${detalleTicketCSS.input} 
                            ${((!statusValue[0].isValid&&statusValue[0].wasOnFocus)||(!statusValue[0].isValid&&statusForm))?detalleTicketCSS.invalidData:''}
                            ${(!statusValue[0].isValid&&statusValue[0].onFocus)?detalleTicketCSS.invalidDataOnfocus:''}
                            ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`}
                                    as="textarea"
                                    placeholder="Titulo"
                                    rows={2}
                                    style={{ height: '100px' }}
                                    onChange={(value) => changeState('nombre',value,0)}
                                    onFocus={() => onFocusInput(true,0)}
                                    onBlur={() => onFocusInput(false,0)}
                            />
                        </FloatingLabel>    

                        <FloatingLabel controlId="floatingTextarea2" label="Descripción" className={modalCSS.labelSelect}>
                            <Form.Control
                            className={`${detalleTicketCSS.input} 
                            ${((!statusValue[1].isValid&&statusValue[1].wasOnFocus)||(!statusValue[1].isValid&&statusForm))?detalleTicketCSS.invalidData:''}
                            ${(!statusValue[1].isValid&&statusValue[1].onFocus)?detalleTicketCSS.invalidDataOnfocus:''}
                            ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`}
                                    as="textarea"
                                    placeholder="Descripción"
                                    rows={3}
                                    style={{ height: '100px' }}
                                    onChange={(value) => changeState('objetivo',value,1)}
                                    onFocus={() => onFocusInput(true,1)}
                                    onBlur={() => onFocusInput(false,1)}
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingSelectGrid" label="Proyecto" className={modalCSS.labelSelect}>
                            <Form.Select placeholder="Seleccionar Proyecto" onChange={(value) => changeState('proyectoID',value,2)}>
                                {proyects && proyects.length > 0 && proyects.map((x: any, index: number) =>
                                    <option key={x.id} value={x.id}>{x.nombre}</option>
                                )}
                            </Form.Select>
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingSelectGrid" label="Seleccionar Encargado" className={modalCSS.labelSelect}>
                            <Form.Select placeholder="Seleccionar Encargado" 
                            value={newTarea.recursoAsignado.name}
                            onChange={(value) => changeState('recursoAsignado',value)}>
                                {employees && employees.length > 0 && employees.map((x: any, index: number) =>
                                    <option key={x.legajo}>{x.nombre} {x.apellido}</option>
                                )}
                            </Form.Select>
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingSelectGrid" label="Seleccionar Prioridad" className={modalCSS.labelSelect}>
                            <Form.Select placeholder="Seleccionar Encargado" 
                            value={newTarea.prioridad}
                            onChange={(value) => changeState('prioridad',value)}>
                                {prioridad && prioridad.length > 0 && prioridad.map((x: any, index: number) =>
                                    <option key={x}>{x}</option>
                                )}
                            </Form.Select>
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingTextarea2" label="Horas Estimadas de la Tarea" className={modalCSS.labelSelect}>
                            <Form.Control
                            className={`${detalleTicketCSS.input} 
                            ${((!statusValue[2].isValid&&statusValue[2].wasOnFocus)||(!statusValue[2].isValid&&statusForm))?detalleTicketCSS.invalidData:''}
                            ${(!statusValue[2].isValid&&statusValue[2].onFocus)?detalleTicketCSS.invalidDataOnfocus:''}
                            ${detalleTicketCSS.input} ${detalleTicketCSS.addRightSelect}`}
                                    type="number"
                                    placeholder="Horas"
                                    onChange={(value) => changeState('horasEstimadas',value,2)}
                                    onFocus={() => onFocusInput(true,2)}
                                    onBlur={() => onFocusInput(false,2)}
                            />
                        </FloatingLabel>    

                        <FloatingLabel controlId="floatingSelectGrid" label="Seleccionar Empleado" className={modalCSS.labelSelect}>
                            <Form.Select placeholder="Prioridad" onChange={(value) => changeState('prioridad',value)}>
                                {prioridad && prioridad.length > 0 && prioridad.map((x: any, index: number) =>
                                    <option key={x}>{x}</option>
                                )}
                            </Form.Select>
                        </FloatingLabel>  </div>}
                        {spinner&&<div className={modalCSS.contentSpinner}>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div> } 
                    </Modal.Body>
                    
                    <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => agregarTareaNueva()}>
                        Agregar
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            
        </div>
        
    )
}
