import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { FaCalendar, FaEdit, FaClock, FaPersonBooth } from 'react-icons/fa';
import MenuDescription from './MenuDescription';
import detalleProjectCSS from '../../Styles/Proyectos/Detalle.module.css';
import { Lider, Patch, Proyecto, Tarea } from "../../models/Proyectos.models";
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { Navigate, useParams } from 'react-router-dom';
import  ProyectoService  from "../../Services/proyectosService";
import { MdHighlightOff } from 'react-icons/md';

export const TareaCrear = (props:any) => {
  const query = window.location.href
  const {idProyecto} = useParams() 
  const [tickets, setTickets] = useState<Array<""> | null>(null)
  const [tarea, setTareas] = useState<Tarea  | null>(null)
  const [proyecto_id,setID] = useState(Number(idProyecto));
  const [recursos, setRecursos] = useState([]);


  const tareaInicial: Tarea = {
    id: 0,
    horasEstimadas: 0,
    nombre: "",
    fechaCreacion: "",
    recursoAsignado: {
      id_recurso: 0,
      name: ""
    },
    estado: "",
    prioridad: "",
    recursosAsignados: [],
    proyectoID: proyecto_id,
    objetivo: ''
  }
  

  const typesPrioridad = [
    'Alta', 'Mdia','Baja'
  ]

  const typesStatus = [
    'Pendiente', 'Asignado', 'Finalizado'
  ]

  const [tareaActual, settareaInicial] = useState(tareaInicial);
  const [disabled, setdisabled] = useState(false);

  const changeValue = (prop: string, value: any) => {
    settareaInicial({ ...tareaActual, [prop]: value.target.value });
  }

  const changeRecurso = (prop: string, value: any) =>{
    const lider: Lider = {
      name: value.target.value,
      id_recurso: value.target.value,
    }
    settareaInicial({...tareaActual, [prop]: lider})
  }

  const updateData = async () => {
   // const response = await ProyectoService().actualizarTarea(tareaActual);
   // console.log(response)
  }

  const changeStateEdit = (state:boolean) => {
    if(state){
     
    };
    setdisabled(state);
  }




  if (!tareaActual){
    return <></>
  }
  function clickGuardar() {
    return <input type="submit" value="Guardar" />;
  }

  

  const handelSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setID(Number(idProyecto))
    settareaInicial({...tareaActual,["proyectoID"]:proyecto_id})
    console.log(tareaActual)
    const answer = ProyectoService().postTarea(tareaActual)
    console.log(answer)
  }
  
 
  return (
    <div>
      <MenuDescription proyecto={tareaActual.nombre} title={"Crear Tarea:"} />
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
                onChange={(e) => changeValue("objetivo",e)} />
            </div>
          </Col>
          <Col className={detalleProjectCSS.col8} md={6} lg={6} m={6}>
           <div className={detalleProjectCSS.contentItem}>
           {<Button  type="submit" className={detalleProjectCSS.iconSave} onSubmit={(e) => handelSubmit(e)} variant="success">Guardar</Button>}
                
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
                <Form.Select defaultValue={tareaActual.estado} disabled={disabled} className={` 
                    ${detalleProjectCSS.input} ${detalleProjectCSS.addRightSelect}`} onChange={(e) => changeValue("estado",e)}>
                    {typesStatus.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                </Form.Select>
              </div>
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Recurso Asignado:</Form.Label>
              <Form.Control
                className={`${(disabled) ? detalleProjectCSS.disabled : ''} ${detalleProjectCSS.input}`}
                type="text"
                id="startDate"
                disabled = {disabled}
                defaultValue={tareaActual.recursoAsignado.name}
                onChange={(value) => changeRecurso('recursoAsignado', value)}
              />
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

