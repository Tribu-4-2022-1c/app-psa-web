import React, { Key, useState } from 'react'
import { Table } from 'react-bootstrap';
import { FaFilter, FaFolder, FaPlusCircle, FaTrash } from 'react-icons/fa';
import MenuDescription from './MenuDescription';
import projectsCSS from '../../Styles/Proyectos/ProyectoProyectos.module.css';
import { Link } from 'react-router-dom';

export const ProyectosProyectos = (props: any) => {
    const { proyecto } = props;

    const headsTable = [
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
            id: "Version",
        },
        {
            id: "Customizacion",
        },
        {
            id: "Codigo",
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
                                {index !== (headsTable.length) &&
                                    <p><FaFilter /></p>}
                            </div>
                        </th>)}
                    </tr>
                </thead>
                <tbody>
                {(proyecto)&&proyecto.map( (ticket: { [x: string]: string; },index: Key | null | undefined) => <tr key={index}>
                    <td>{ticket['nombre']}</td>
                    <td>{ticket['tipo']}</td>
                    <td>{ticket['cliente']}</td>
                    <td>{ticket['alcance']}</td>
                    <td>{ticket['version']}</td>
                    <td>{ticket['horaEstimada']}</td>
                    <td>{ticket['fecha_inicio']}</td>
                    <td>{ticket["fecha_fin"]}</td>
                    <td>{ticket["estado"]}</td>
                        <td><Link className={projectsCSS.styleNav} to={'/proyectos/'+ ticket["id"]} state={{ticket}}><FaFolder /></Link></td>
                        <td><Link className={projectsCSS.styleNav} to={`#`} onClick={() => { if (window.confirm('Are you sure to delete this record?')) { }; }}><FaTrash /></Link></td>

                    </tr>)}
                </tbody>
            </Table>
        </div>
    )
}