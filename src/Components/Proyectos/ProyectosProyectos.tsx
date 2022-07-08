import React, { Key, useState } from 'react'
import { Table } from 'react-bootstrap';
import { FaFilter, FaFolder, FaPlusCircle, FaTrash } from 'react-icons/fa';
import MenuDescription from './MenuDescription';
import projectsCSS from '../../Styles/Proyectos/ProyectoProyectos.module.css';
import { Link } from 'react-router-dom';
import { ModalComponentDelete } from './ModalDeleteProyecto';
import ProyectoService from '../../Services/proyectosService';

export const ProyectosProyectos = (props: any) => {
    const { proyecto } = props;
 const [show, setshow] = useState(false);
 
 const deleteProject = (id: string) => {
    ProyectoService().removeProyecto(id)
    console.log("ss");
 //   setshow(true);
  }
 const closeModal = () => {
    setshow(false);
  }
    const headsTable = [
        {
            id:"Id",
        },
        {
            id: "Nombre",
        },
        {
            id: "Descripcion",
        },
        {
            id: "Fecha de Inicio",
        },
        {
            id: "Estado",
        },
        {
            id: "Tipo",
        },
        {
            id: "Producto",
        },
        {
            id: "Horas Estimadas",
        },
        {
            id: "Mas detalles",
        }

    ]
    return (
        <div>
            <MenuDescription proyecto={proyecto.nombre} title={"Proyectos Disponibles"} flagGenerateProyecto={1}/>
            <Table responsive bordered >
                <thead>
                    <tr >
                        {headsTable && headsTable.map((head, index) => <th key={index}>
                            <div className={projectsCSS.contentFilter}>
                                <p>{head.id}</p>
                                {index !== (headsTable.length-1) &&
                                    <p><FaFilter /></p>}
                            </div>
                        </th>)}
                    </tr>
                </thead>
                <tbody>
                {(proyecto)&&proyecto.map( (ticket: { [x: string]: string; },index: Key | null | undefined) => <tr key={index}>
                    <td>{ticket["id"]}</td>
                    <td>{ticket['nombre']}</td>
                    <td>{ticket['descripcion']}</td>
                    <td>{ticket['fecha_inicio']}</td>
                    <td>{ticket['estado']}</td>
                    <td>{ticket['tipo']}</td>
                    <td>{ticket['producto']}</td>
                    <td>{ticket['horaestimada']}</td>
			        <td>
			        <div className={projectsCSS.contentItem}>
			            <Link className={projectsCSS.styleNav} to={'/proyectos/' + ticket["id"]} state={{ ticket }}><FaFolder /></Link>
                        <Link className={projectsCSS.styleNav} to={`#`} onClick={() => { if (window.confirm('Se eliminara el proyecto ' +ticket["nombre"])) {deleteProject(ticket["id"]) }; }}><FaTrash /></Link>
			        </div>
			        </td>
                    </tr>)}
                </tbody>
            </Table>
        </div>
    )
}


