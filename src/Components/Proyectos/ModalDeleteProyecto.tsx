import { Button, Modal, ModalHeader } from 'react-bootstrap'
import { IoCloseCircleSharp } from "react-icons/io5";
import modalCSS from '../../Styles/Proyectos/ModalDelete.module.css';

export const ModalComponentDelete = (props: any) => {
    const initialTaskData: any = {

    }
    const { id, name} = props;
    const { show, closeModal } = props;
    function borrarProyecto(): void {
        ProyectoService().removeProyecto(id)
        closeModal()
    }
    return (
        <div>
            <Modal
                show={show}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <ModalHeader>
                    <Modal.Title className={modalCSS.titleTarea}>Eliminar Proyecto</Modal.Title>
                    <IoCloseCircleSharp onClick={() => closeModal()} className={modalCSS.iconClose} />
                </ModalHeader>
                <Modal.Body>
                     <div> El proyecto {id} - {name} sera eliminado </div>
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



