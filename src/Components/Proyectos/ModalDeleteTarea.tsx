import { Button, Modal, ModalHeader } from 'react-bootstrap'
import { IoCloseCircleSharp } from "react-icons/io5";
import modalCSS from '../../Styles/Proyectos/ModalDelete.module.css';

export const ModalComponentDelete = (props: any) => {
    const initialTaskData: any = {

    }
    const { show, closeModal } = props;
    function borrarProyecto(): void {
        throw new Error('Function not implemented.');
    }
    return (
        <div>
            <Modal
                show={show}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <ModalHeader>
                    <Modal.Title className={modalCSS.titleTarea}>Eliminar Tarea</Modal.Title>
                    <IoCloseCircleSharp onClick={() => closeModal()} className={modalCSS.iconClose} />
                </ModalHeader>
                <Modal.Body>
                    <div> La Tarea sera eliminado </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button  onClick={() => borrarProyecto()}>
                        Eliminar
                    </Button>
                    <Button onClick={() => closeModal()}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


