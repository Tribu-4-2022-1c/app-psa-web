import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import {FaSortAmountDown, FaEye, FaFolderOpen, FaPlusCircle} from 'react-icons/fa';
import {Link, NavLink, useNavigate, useParams} from 'react-router-dom';
import recursosService from '../../Services/recursosService';
import empleadosCSS from '../../Styles/Empleados.module.css';
import versionSoporteStyle from "../../Styles/VersionSoporte.module.css";


export const Empleados = (props:any) => {
  const {product} = useParams();
  const {version} = useParams();
  const [nombre, setnombre] = useState([]);
  const [apellido, setapellido] = useState([]);
  const [legajo, setlegajo] = useState([]);
  const headsTable = [
    {
      id:"Legajo",
    },
    {
      id:"Nombre",
    },
    {
      id:"Apellido",
    },
  ]

  useEffect(() => {
    const recursos_ = async () =>{
      const allNombres:any = await recursosService().getNombres();
      const allApellidos:any = await recursosService().getApellidos();
      const allLegajos:any = await recursosService().getLegajos();
      setnombre(allNombres);
      /*setapellido(allApellidos)
      setlegajo(allLegajos)*/
    }
    recursos_();
  },[]);


  return (
      <div>
        <div className={empleadosCSS.contentDetail}>
          <div className={empleadosCSS.contenDescription}>
            <div className={empleadosCSS.item}>
              <p className={empleadosCSS.label}>Recursos</p>
            </div>
          </div>

        </div>
        <Table responsive bordered >
          <thead>
          <tr >
            {headsTable&&headsTable.map((head,index) => <th key={index}>
              <div className={empleadosCSS.contentFilter}>
                <p>{head.id}</p>
                {index!=(headsTable.length)&&
                    <p><FaSortAmountDown/></p>}
              </div>
            </th>)}
          </tr>
          </thead>
          <tbody>
          {(nombre)&&nombre.map( (empleado, index) => <tr key={index}>
            <td>{empleado['legajo']}</td>
            <td>{empleado['Nombre']}</td>
            <td>{empleado['Apellido']}</td>
          </tr>)}
          </tbody>
        </Table>
      </div>
  )
}
