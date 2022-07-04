import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { FaCalendar, FaEdit, FaClock, FaPersonBooth } from 'react-icons/fa';
import MenuDescription from './MenuDescription';
import detalleProjectCSS from '../../Styles/Proyectos/Detalle.module.css';
import { Patch, Proyecto, Tarea } from "../../models/Proyectos.models";
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { Navigate, useParams } from 'react-router-dom';
import  ProyectoService  from "../../Services/proyectosService";
import { MdHighlightOff } from 'react-icons/md';

export const TareaProyectos = (props:any) => {
   
  const {id} = useParams();
  const [tickets, setTickets] = useState<Array<""> | null>(null)
  const [tarea, setTareas] = useState<Tarea  | null>(null)
  const [recursos, setRecursos] = useState([])



  const tareaInicial: Tarea = {
    id: 0,
    horasEstimadas: 0,
    nombre: "",
    fechaCreacion: "",
    recursoAsignado: {
      id: 0,
      name: ""
    },
    estado: "",
    prioridad: "",
    recursosAsignados: [],
    proyectoID: 0,
    objetivo: ''
  }
  

  const typesPrioridad = [
    'Alta', 'Media','Baja'
  ]

  const typesStatus = [
    'Pendiente', 'Asignado', 'Finalizado'
  ]

  const [tareaActual, settareaInicial] = useState(tareaInicial);
  const [disabled, setdisabled] = useState(true);


  const changeValue = (prop: string, value: any) => {
    
    settareaInicial({ ...tareaActual, [prop]: value.target.value });
  }

  const updateData = async () => {
    console.log(tareaActual)
   const response = await ProyectoService().actualizarTarea(tareaActual,id);
   console.log(response)
  }

  const changeStateEdit = (state:boolean) => {
    if(state){
     
    };
    setdisabled(state);
  }

  useEffect(()=>{
    const recursos_ = async () =>{
        const getRecursos:any = await ProyectoService().getRecursos();
        setRecursos(getRecursos);
    }
    recursos_();
  },[]);


  useEffect(()=>{
    const proyecto_ = async () =>{
        const getTarea:any = await ProyectoService().getTareaFor(id);
        settareaInicial(getTarea);
    }
    proyecto_();
  },[]);


  if (!tareaActual){
    return <></>
  }

  const handelSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    //const patch: Patch ={
      //estado: tareaActual.estado,
      //nombre: tareaActual.nombre,
      //version: tareaActual.version,
      //descripcion: tareaActual.descripcion,
      //tipo: tareaActual.tipo
    //}
    
    //ProyectoService().actualizarTarea(patch,id)
  }
  
 
  return (
    <div>
      <MenuDescription proyecto={tareaActual.nombre} title={"Tarea"} />
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
                value={tareaActual.nombre || ""}
                onChange={(e) => changeValue("nombre",e)}/>
              <Form.Label className={detalleProjectCSS.label} htmlFor="inputPassword5">Objetivo:</Form.Label>
              <Form.Control
                className={`${(disabled) ? (detalleProjectCSS.disabled && detalleProjectCSS.removeCorner) : ''}`}
                as="textarea"
                id="descripcion"
                rows={8}
                disabled={disabled}
                defaultValue={tareaActual.objetivo}
                onChange={(e) => changeValue("descripcion",e)} />
            </div>
          </Col>
          <Col className={detalleProjectCSS.col8} md={6} lg={6} m={6}>
           <div className={detalleProjectCSS.contentItem}>
                {!disabled && <Button className={detalleProjectCSS.iconSave} onClick={() => (updateData(),changeStateEdit(true)) } variant="success">Guardar</Button>}
                {!disabled && <MdHighlightOff className={`${detalleProjectCSS.editIcon} ${detalleProjectCSS.iconClose}`} onClick={() => changeStateEdit(true)} />}
                {disabled && <FaEdit className={`${detalleProjectCSS.editIcon}`} onClick={() => changeStateEdit(false)} />}
              </div>
              <div className={detalleProjectCSS.contentItem}>
              
              </div>
              <div className={detalleProjectCSS.contentItem}>
              
              </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Fecha de Creacion:</Form.Label>
              <Form.Control
                className={`${(disabled) ? detalleProjectCSS.disabled : ''} ${detalleProjectCSS.input}`}
                type="text"
                id="startDate"
                disabled = {disabled}
                defaultValue={tareaActual.fechaCreacion}
                onChange={(value) => changeValue('fechaCreacion', value)}
              />
             <FaCalendar className={`${detalleProjectCSS.icon}  ${detalleProjectCSS.calendar}`} />
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Horas estimadas:</Form.Label>
              <Form.Control
                className={`${(disabled) ? detalleProjectCSS.disabled : ''} ${detalleProjectCSS.input}`}
                type="text"
                id="startDate"
                disabled = {disabled}
                defaultValue={tareaActual.horasEstimadas}
                onChange={(value) => changeValue('horasEstimadas', value)}
              />
             <FaClock className={`${detalleProjectCSS.icon}  ${detalleProjectCSS.calendar}`} />
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Prioridad:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select value={tareaActual.prioridad} disabled={disabled} className={` 
                    ${detalleProjectCSS.input} ${detalleProjectCSS.addRightSelect}`} onChange={(e) => changeValue("prioridad",e)}>
                  {typesPrioridad.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                </Form.Select>
              </div>
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Estado:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select value={tareaActual.estado} disabled={disabled} className={` 
                    ${detalleProjectCSS.input} ${detalleProjectCSS.addRightSelect}`}  onChange={(e) => changeValue("estado",e)}>
                    {typesStatus.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                </Form.Select>
              </div>
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Recurso Asignado:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select value={tareaActual.recursoAsignado.name} disabled={disabled} className={` 
                    ${detalleProjectCSS.input} ${detalleProjectCSS.addRightSelect}`}  onChange={(e) => changeValue("recursoAsignado",e)}>
                    {recursos.map((type: any, index: number) => <option key={index} value={type.nombre}>{type.nombre}</option>)}
                </Form.Select>
              </div>
             <FaPersonBooth className={`${detalleProjectCSS.icon}  ${detalleProjectCSS.calendar}`} />
            </div>
   
          </Col>
        </Row>

        </form>
      </div>
      <Row className={detalleProjectCSS.col8} md={40} lg={40} m={40}>
        <Col className={detalleProjectCSS.col8} md={20} lg={20} m={20}>
          <div className={`${detalleProjectCSS.contentTaskprojects} ${(tarea) ? detalleProjectCSS.uninformation : ''}`}>
            {((tickets)&& !(Object.keys(tickets).length === 0)) && <Table responsive bordered >
              <thead>
                <tr>
                  <td>Nombre de tarea</td>
                  <td>Horas Estimadas</td>
                  <td>Fecha de creacion</td>
                  <td>Mas informacion</td>
                </tr>
              </thead>
              <tbody>
           
              </tbody>
            </Table>}
            {((tickets) && (Object.keys(tickets).length === 0)) &&
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

