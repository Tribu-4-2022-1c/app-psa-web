import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row, Table } from 'react-bootstrap';
import { FaCalendar, FaEye } from 'react-icons/fa';
import MenuDescription from './MenuDescription';
import detalleProjectCSS from '../../Styles/Proyectos/Detalle.module.css';
import { Proyecto, Tarea } from "../../models/Proyectos.models";
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { Navigate, useParams } from 'react-router-dom';
import  ProyectoService  from "../../Services/proyectosService";

export const ProyectoProyectos = (props: any) => {

  const {id} = useParams();
  const [tareas, setTareas] = useState<Array<Tarea> | null>(null)
  const [proyecto, setProyecto] = useState<Proyecto  | null>(null)

  useEffect(()=>{
    const tareas_ = async () =>{
        const getTareas:any = await ProyectoService().getAllTaksFor(id);
        setTareas(getTareas);
    }
    tareas_();
  },[]);
  useEffect(()=>{
    const proyecto_ = async () =>{
        const getProyecto:any = await ProyectoService().getProyectoFor(id);
        setProyecto(getProyecto);
    }
    proyecto_();
  },[]);
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
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [cliente, setCliente] = useState("");
  const [version, setVersion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("");
  //const [lider, setLider] = useState();


  if (!proyecto){
    return <></>
  }

  const handelSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    if (nombre === '') {setNombre(proyecto?.nombre)}
    if (tipo === '') {setTipo(proyecto?.tipo)}
    if (descripcion === '') {setDescripcion(proyecto?.descripcion)}
    if (version === '') {setVersion(proyecto?.version)}
    if (estado === '') {setEstado(proyecto?.estado)}
    const patch = {nombre, tipo, version, descripcion, estado}
    console.log(patch)
    //if (lider == "") setNombre(proyecto?.lider)
    ProyectoService().actualizarProyecto(patch,id)
  }


  return (
    <div>
      <MenuDescription proyecto={proyecto.nombre} title={"Proyecto"} />
      <div>
        <form onSubmit={handelSubmit}>
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
                onChange={(e) => setNombre(e.target.value)}/>
              <Form.Label className={detalleProjectCSS.label} htmlFor="inputPassword5">Descripción:</Form.Label>
              <Form.Control
                className={`${(disabled) ? (detalleProjectCSS.disabled && detalleProjectCSS.removeCorner) : ''}`}
                as="textarea"
                id="description"
                rows={8}
                disabled={disabled}
                defaultValue={proyecto.descripcion}
                onChange={(e) => setDescripcion(e.target.value)} />
            </div>
          </Col>
          <Col className={detalleProjectCSS.col8} md={6} lg={6} m={6}>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Fecha de inicio de Proyecto:</Form.Label>

              <FaCalendar className={`${detalleProjectCSS.icon}  ${detalleProjectCSS.calendar}`} />
              <Form.Control
                className={`${(disabled) ? detalleProjectCSS.disabled : ''} ${detalleProjectCSS.input}`}
                type="text"
                id="startDate"
                disabled = {true}
                defaultValue={proyecto.fecha_inicio}
                onChange={(value) => changeValue('creationDate', value)}
              />
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Tipo:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select value={detalleProjectCSS.type} disabled={disabled} className={` 
                    ${detalleProjectCSS.input} ${detalleProjectCSS.addRightSelect}`} defaultValue={proyecto.tipo} onChange={(e) => setTipo(e.target.value)}>
                  {typesProject.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                </Form.Select>
              </div>
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Estado:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select value={detalleProjectCSS.type} disabled={disabled} className={` 
                    ${detalleProjectCSS.input} ${detalleProjectCSS.addRightSelect}`} defaultValue= {proyecto.estado} onChange={(e) => setEstado(e.target.value)}>
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
        <button>Guardar informacion</button>
        </form>
      </div>
      <Row className={detalleProjectCSS.col8} md={40} lg={40} m={40}>
        <Col className={detalleProjectCSS.col8} md={20} lg={20} m={20}>
          <div className={`${detalleProjectCSS.contentTaskprojects} ${(proyecto) ? detalleProjectCSS.uninformation : ''}`}>
            {((tareas)&& !(Object.keys(tareas).length === 0)) && <Table responsive bordered >
              <thead>
                <tr>
                  <td>project</td>
                  <td>Nombre de tarea</td>
                  <td>Horas Estimadas</td>
                  <td>Fecha de creacion</td>
                  <td>Mas informacion</td>
                </tr>
              </thead>
              <tbody>
                {tareas&&tareas.map((tarea: Tarea, index: number) => <tr key={index}>
                  <td>
                    {tarea.nombre}
                  </td>
                  <td>{tarea.fechaCreacion}</td>
                  <td>{tarea.horasEstimadas}</td>
                  <td>
                    <FaEye />
                  </td>
                </tr>)}
              </tbody>
            </Table>}
            {((tareas) && (Object.keys(tareas).length === 0)) &&
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



