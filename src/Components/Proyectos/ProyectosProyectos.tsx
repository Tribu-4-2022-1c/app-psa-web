import React, { useState } from 'react'
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
            <MenuDescription proyecto={proyecto} title={"Proyectos Disponibles"} flagGenerateProyecto={1}/>
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
                    <tr>
                        <td>a</td>
                        <td>a</td>
                        <td>a</td>
                        <td>a</td>
                        <td>a</td>
                        <td>a</td>
                        <td>a</td>
                        <td>a</td>
                        <td>a</td>
                        <td><Link className={projectsCSS.styleNav} to={'/proyectos/proyecto'} state={{}}><FaFolder /></Link></td>
                        <td><Link className={projectsCSS.styleNav} to={`#`} onClick={() => { if (window.confirm('Are you sure to delete this record?')) { }; }}><FaTrash /></Link></td>

                    </tr>
                </tbody>
            </Table>
        </div>
    )
}