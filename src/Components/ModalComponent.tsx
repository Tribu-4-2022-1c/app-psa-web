import React, { useState } from 'react'
import { Button,FloatingLabel,Form,Modal} from 'react-bootstrap'
import { IoCloseCircleSharp } from "react-icons/io5";
import modalCSS from '../Styles/Modal.module.css';

export const ModalComponent = (props: any) => {
    const initialTaskData:any = {
        employeed:'',
        description:''
    }
    const { employees, show, closeModal,agregarTarea } = props;
    const [newTarea, setnewTarea] = useState(initialTaskData);

    const agregarTareaNueva = () => {
        console.log(newTarea)
        agregarTarea(newTarea);
    }

    const changeState = (prop:string,value:any) => {
        setnewTarea({ ...newTarea, [prop]: value.target.value });
    }

    return (
        <div>
            <Modal show={show} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title className={modalCSS.titleTarea}>Nueva Tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel controlId="floatingSelectGrid" label="Sele" className={modalCSS.labelSelect}>
                         <Form.Select placeholder="Seleccionar Encargado" onChange={(value) => changeState('employeed',value)}>
                             {employees && employees.length > 0 && employees.map((x: any, index: number) =>
                                 <option key={x.legajo}>{x.nombre + ' ' + x.apellido}</option>
                             )}
                         </Form.Select>
                     </FloatingLabel>

                     <FloatingLabel controlId="floatingTextarea2" label="Titulo" className={modalCSS.labelSelect}>
                         <Form.Control
                             as="textarea"
                             placeholder="Titulo"
                             rows={3}
                             style={{ height: '100px' }}
                             onChange={(value) => changeState('title',value)}
                         />
                     </FloatingLabel>    
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
    )
}
