import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row, Table } from 'react-bootstrap';
import { FaCalendar, FaEye } from 'react-icons/fa';
import MenuDescription from './MenuDescription';
import detalleProjectCSS from '../../Styles/Proyectos/Detalle.module.css';
import { Proyecto } from "../../models/Proyectos.models";
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { useParams } from 'react-router-dom';
import  ProyectoService  from "../../Services/proyectosService";

export const ProyectoProyectos = (props: any) => {

  const {id} = useParams();
  const [tareas, setTareas] = useState<any[]>([])
  const [proyecto, setProyecto] = useState<Proyecto  | null>(null)

  useEffect(()=>{
    const tareas_ = async () =>{
        const getTareas:any = await ProyectoService().getAllTaksFor(id);
        setTareas(getTareas);
    }
    tareas_();
  },[]);
  console.log(tareas)
  useEffect(()=>{
    const proyecto_ = async () =>{
        const getProyecto:any = await ProyectoService().getProyectoFor(id);
        setProyecto(getProyecto);
    }
    proyecto_();
  },[]);
  console.log(proyecto);
  //useEffect (() => {
  //  fetch(LocalUrl + "/"+id, {
  //    method: "GET",
  //    headers:{
  //      Accept:"application/json",
  //      "content_type": "application/json"
  //    },
  //  })
  //  .then((res) => res.json())
  //  .catch((error) => console.error("Error",error))
  //  .then((response) => {
  //    setProyecto(response)
  //  })
  //})

  const typesProject = [
    'IMPLEMENTACION', 'DESARROLLO'
  ]

  const typesStatus = [
    'PENDIENTE', 'ASIGNADO', 'FINALIZADO'
  ]

  //const [projectCurrent, setprojectCurrent] = useState(proyecto);
  const [disabled, setdisabled] = useState(false);

  const changeValue = (prop: string, value: any) => {
    //setprojectCurrent({ ...projectCurrent, [prop]: value.target.value });
  }

  const handelSubmit = (props: any) => {
    
  }
  if (!proyecto){
    return <></>
  }
  console.log(tareas)
  return (
    <div>
      <MenuDescription proyecto={proyecto.nombre} title={"Proyecto"} />
      <div>
        <Row className={detalleProjectCSS.contentRow}>
          <Col className={detalleProjectCSS.col4} md={6} lg={6} m={6}>
            <div>
              <Form.Label className={detalleProjectCSS.label} htmlFor="name">Nombre:</Form.Label>
              <Form.Control
                className={`${(disabled) ? (detalleProjectCSS.disabled && detalleProjectCSS.removeCorner) : ''}`}
                as="textarea"
                id="name"
                disabled={disabled}
                defaultValue={proyecto.nombre}
                onChange={(value) => changeValue('nombre', value)} />

              <Form.Label className={detalleProjectCSS.label} htmlFor="inputPassword5">Descripción:</Form.Label>
              <Form.Control
                className={`${(disabled) ? (detalleProjectCSS.disabled && detalleProjectCSS.removeCorner) : ''}`}
                as="textarea"
                id="description"
                rows={8}
                disabled={disabled}
                defaultValue={proyecto.descripcion}
                onChange={(value) => changeValue('description', value)} />
            </div>
          </Col>
          <Col className={detalleProjectCSS.col8} md={6} lg={6} m={6}>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Lider:</Form.Label>
              <Form.Control
                className={`${(disabled) ? detalleProjectCSS.disabled : ''} ${detalleProjectCSS.input}`}
                type="text"
                id="lead"
                disabled={disabled}
                defaultValue={proyecto.cliente}
                onChange={(value) => changeValue('client', value)}
              />
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Fecha de inicio de Proyecto:</Form.Label>

              <FaCalendar className={`${detalleProjectCSS.icon}  ${detalleProjectCSS.calendar}`} />
              <Form.Control
                className={`${(disabled) ? detalleProjectCSS.disabled : ''} ${detalleProjectCSS.input}`}
                type="text"
                id="startDate"
                disabled={disabled}
                defaultValue={proyecto.fecha_inicio}
                onChange={(value) => changeValue('creationDate', value)}
              />
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Tipo:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select value={detalleProjectCSS.type} disabled={disabled} className={` 
                    ${detalleProjectCSS.input} ${detalleProjectCSS.addRightSelect}`} onChange={(value) => changeValue('type', value)}>
                  {typesProject.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                </Form.Select>
              </div>
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Estado:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select value={detalleProjectCSS.type} disabled={disabled} className={` 
                    ${detalleProjectCSS.input} ${detalleProjectCSS.addRightSelect}`} onSubmit={(value) => changeValue('type', value)}>
                  {typesStatus.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                </Form.Select>
              </div>
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Producto:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select >
                </Form.Select>
              </div>
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Version:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select >
                </Form.Select>
              </div>
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Customizacion:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select >
                </Form.Select>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Row className={detalleProjectCSS.col8} md={6} lg={6} m={6}>
        <Col className={detalleProjectCSS.col8} md={6} lg={6} m={6}>
          <div className={`${detalleProjectCSS.contentTaskprojects} ${(proyecto) ? detalleProjectCSS.uninformation : ''}`}>
            {(proyecto) && <Table responsive bordered >
              <thead>
                <tr>
                  <td>project</td>
                  <td>Nombre de tarea</td>
                </tr>
              </thead>
              <tbody>
                {tareas&&tareas.map((tarea: any, index: number) => <tr key={index}>
                  <td>
                    {tarea.nombre}
                  </td>
                  <td>{tarea.fechaCreacion}</td>
                  <td>
                    <FaEye />
                  </td>
                </tr>)}
              </tbody>
            </Table>}
            {((proyecto) || !proyecto) &&
              <Card className={detalleProjectCSS.contentCard}>
                <CardHeader>
                  No hay Tareas Asociadas a este Proyecto
                </CardHeader>
              </Card>
            }
          </div>
        </Col>
      </Row>
    </div>
  )
}



