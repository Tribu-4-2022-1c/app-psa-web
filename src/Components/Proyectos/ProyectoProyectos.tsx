import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { FaCalendar, FaEdit, FaEye } from 'react-icons/fa';
import MenuDescription from './MenuDescription';
import detalleProjectCSS from '../../Styles/Proyectos/Detalle.module.css';
import { Patch, Proyecto, Tarea } from "../../models/Proyectos.models";
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { Link, Navigate, useParams } from 'react-router-dom';
import  ProyectoService  from "../../Services/proyectosService";
import { MdHighlightOff } from 'react-icons/md';

export const ProyectoProyectos = (props: any) => {

  const {id} = useParams();
  const [tareas, setTareas] = useState<Array<Tarea> | null>(null)
  const [proyecto, setProyecto] = useState<Proyecto  | null>(null)



  const proyectoInicial: Proyecto = {
    id: "",
    nombre:      "",
    tipo:        "",
    cliente:     "",
    alcance:     "",
    version:     "",
    descripcion: "",
    tareas:      [],
    horaEstimada: 0,
    fecha_inicio: "",
    fecha_fin:   "",
    estado:      "",
    lider:       {
      id: 0,
      name: ""
    }
  }

  const typesProject = [
    'IMPLEMENTACION', 'DESARROLLO'
  ]

  const typesStatus = [
    'PENDIENTE', 'ASIGNADO', 'FINALIZADO'
  ]

  const [proyectoActual, setproyectoInicial] = useState(proyectoInicial);
  const [disabled, setdisabled] = useState(true);

  const changeValue = (prop: string, value: any) => {
    setproyectoInicial({ ...proyectoActual, [prop]: value.target.value });
  }

  const updateData = async () => {
    const response = await ProyectoService().actualizarProyecto(proyectoActual);
    console.log(response)
  }

  const changeStateEdit = (state:boolean) => {
    if(state){
     
    };
    setdisabled(state);
  }

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
        setproyectoInicial(getProyecto);
    }
    proyecto_();
  },[]);


  if (!proyectoActual){
    return <></>
  }

  const handelSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    const patch: Patch ={
      estado: proyectoActual.estado,
      nombre: proyectoActual.nombre,
      version: proyectoActual.version,
      descripcion: proyectoActual.descripcion,
      tipo: proyectoActual.tipo
    }
    
    ProyectoService().actualizarProyecto(patch,id)
  }
  
  console.log(proyectoActual)
 
  return (
    <div>
      <MenuDescription proyecto={proyectoActual.nombre} title={"Proyecto"} />
      <div>
        <form onSubmit={handelSubmit}>
        <Row className={detalleProjectCSS.contentRow}>
          <Col className={detalleProjectCSS.col4} md={6} lg={6} m={6}>
            <div>
              <Form.Label className={detalleProjectCSS.label} htmlFor="nombre">Nombre:</Form.Label>
              <Form.Control
                className={`${(disabled) ? (detalleProjectCSS.disabled && detalleProjectCSS.removeCorner) : ''}`}
                as="textarea"
                id="nombre"
                disabled={disabled}
                value={proyectoActual.nombre || ""}
                onChange={(e) => changeValue("nombre",e)}/>
              <Form.Label className={detalleProjectCSS.label} htmlFor="inputPassword5">Descripción:</Form.Label>
              <Form.Control
                className={`${(disabled) ? (detalleProjectCSS.disabled && detalleProjectCSS.removeCorner) : ''}`}
                as="textarea"
                id="descripcion"
                rows={8}
                disabled={disabled}
                defaultValue={proyectoActual.descripcion}
                onChange={(e) => changeValue("descripcion",e)} />
            </div>
          </Col>
          <Col className={detalleProjectCSS.col8} md={6} lg={6} m={6}>
           <div className={detalleProjectCSS.contentItem}>
                {!disabled && <Button className={detalleProjectCSS.iconSave} onClick={() => updateData()} variant="success">Guardar</Button>}
                {!disabled && <MdHighlightOff className={`${detalleProjectCSS.editIcon} ${detalleProjectCSS.iconClose}`} onClick={() => changeStateEdit(true)} />}
                {disabled && <FaEdit className={`${detalleProjectCSS.editIcon}`} onClick={() => changeStateEdit(false)} />}
              </div>
              <div className={detalleProjectCSS.contentItem}>
              
              </div>
              <div className={detalleProjectCSS.contentItem}>
              
              </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Fecha de inicio de Proyecto:</Form.Label>
              <Form.Control
                className={`${(disabled) ? detalleProjectCSS.disabled : ''} ${detalleProjectCSS.input}`}
                type="text"
                id="startDate"
                disabled = {disabled}
                defaultValue={proyectoActual.fecha_inicio}
                onChange={(value) => changeValue('creationDate', value)}
              />
             <FaCalendar className={`${detalleProjectCSS.icon}  ${detalleProjectCSS.calendar}`} />
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Tipo:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select value={detalleProjectCSS.type} disabled={disabled} className={` 
                    ${detalleProjectCSS.input} ${detalleProjectCSS.addRightSelect}`} defaultValue = {proyectoActual.tipo}onChange={(e) => changeValue("tipo",e)}>
                  {typesProject.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                </Form.Select>
              </div>
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Estado:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select value={detalleProjectCSS.type} disabled={disabled} className={` 
                    ${detalleProjectCSS.input} ${detalleProjectCSS.addRightSelect}`} defaultValue = {proyectoActual.estado} onChange={(e) => changeValue("estado",e)}>
                    {typesStatus.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                </Form.Select>
              </div>
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Producto:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select value={detalleProjectCSS.type} disabled={disabled} >
                </Form.Select>
              </div>
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Version:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select value={detalleProjectCSS.type} disabled={disabled} >
                </Form.Select>
              </div>
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Customizacion:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select value={detalleProjectCSS.type} disabled={disabled} >
                </Form.Select>
              </div>
            </div>
          </Col>
        </Row>

        </form>
      </div>
      <Row className={detalleProjectCSS.col8} md={40} lg={40} m={40}>
        <Col className={detalleProjectCSS.col8} md={20} lg={20} m={20}>
          <div className={`${detalleProjectCSS.contentTaskprojects} ${(proyecto) ? detalleProjectCSS.uninformation : ''}`}>
            {((tareas)&& !(Object.keys(tareas).length === 0)) && <Table responsive bordered >
              <thead>
                <tr>
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
                  <td>{tarea.horasEstimadas}</td>
                                    <td>{tarea.fechaCreacion}</td>
                  <td>
                    <Link className={detalleProjectCSS.styleNav} to={'/proyectos/tarea/' + tarea["id"]} state={{ tarea }}><FaEye /></Link>
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





