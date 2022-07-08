import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { FaCalendar, FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import MenuDescription from './MenuDescription';
import detalleProjectCSS from '../../Styles/Proyectos/Detalle.module.css';
import { Patch, Proyecto, RecrusoSoporte, Tarea } from "../../models/Proyectos.models";
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { Link, Navigate, useParams } from 'react-router-dom';
import  ProyectoService  from "../../Services/proyectosService";
import { MdHighlightOff } from 'react-icons/md';
import { ModalComponentDelete } from './ModalDeleteTarea';
import projectsCSS from '../../Styles/Proyectos/ProyectoProyectos.module.css';
import tareasCSS from "../../Styles/Proyectos/TareasProyectos.module.css";


export const ProyectoProyectos = (props: any) => {
  const [show, setshow] = useState(false);
  const {id} = useParams();
  const [tareas, setTareas] = useState<Array<Tarea> | null>(null)
  const [proyecto, setProyecto] = useState<Proyecto  | null>(null)
  let [recursos,setRecursos] = useState<Array<RecrusoSoporte>>([])
  const closeModal = () => {
    setshow(false);
  }




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
      id_recurso: 1,
      name: "Un Lider"
    
    },
    producto:    "",
  }

  const typesProject = [
    'IMPLEMENTACION', 'DESARROLLO'
  ]

  const typesStatus = [
    'Pendiente', 'Asignado', 'Finalizado',"En curso"
  ]

  const [proyectoActual, setproyectoInicial] = useState(proyectoInicial);
  const [disabled, setdisabled] = useState(true);
  const [productos,setProductos] = useState([])
  const [lider,setLider] = useState(0)


  const deleteTarea = (id:string) => {
    ProyectoService().removeTarea(id)
    console.log("ss");
    //setshow(true);
  }
  const changeValue = (prop: string, value: any) => {
    if(prop == "lider"){
      setproyectoInicial({...proyectoActual,[prop]:{
        "id_recurso": recursos[value.target.value].file,
        "name": recursos[value.target.value].name + " "+ recursos[value.target.value].lastname
      }})
      setLider(value.target.value)
      return
    }
    setproyectoInicial({ ...proyectoActual, [prop]: value.target.value });
    console.log(proyectoActual)
  }

  const changeProducto = (prop: string, value: any) => {
    console.log(value.target.value)
    setproyectoInicial({ ...proyectoActual, [prop]: value.target.value });
    console.log(proyectoActual)
    
  }


  const updateData = async () => {
    console.log(proyectoActual)
    const response = await ProyectoService().actualizarProyecto(proyectoActual, id);
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
        if (getProyecto.lider != null){
          setLider(getProyecto.lider.id_recurso-1)
        }
        setproyectoInicial(getProyecto);
    }
    proyecto_();
  },[]);

  useEffect(() => {
    const productos_ = async () => {
      const getProductos:any = await ProyectoService().getAllProductos();
      setProductos(getProductos)
    }
    productos_();
  },[])

  useEffect(() =>{
    const recursos_ = async() =>{
      let getRecursos: any = await ProyectoService().getRecursos();
      setRecursos(getRecursos)
    }
    recursos_();
  },[])

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
      tipo: proyectoActual.tipo,
      producto: proyectoActual.producto
    }
    
    ProyectoService().actualizarProyecto(patch,id)
  }

  console.log(recursos)
  return (
    <div>
      
      <MenuDescription proyecto={proyectoActual.nombre} flagGenerateTask={false} title={"Proyecto"} id_proyecto ={id}/>
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
                {!disabled && <Button className={detalleProjectCSS.iconSave} onClick={() => (updateData(), changeStateEdit(true))} variant="success">Guardar</Button>}
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
                onChange={(value) => changeValue('fecha_inicio', value)}
              />
             <FaCalendar className={`${detalleProjectCSS.icon}  ${detalleProjectCSS.calendar}`} />
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Tipo:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select value={proyectoActual.tipo} disabled={disabled} className={` 
                    ${detalleProjectCSS.input} ${detalleProjectCSS.addRightSelect}`} onChange={(e) => changeValue("tipo",e)}>
                  {typesProject.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                </Form.Select>
              </div>
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Estado:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select value={proyectoActual.estado} disabled={disabled} className={` 
                    ${detalleProjectCSS.input} ${detalleProjectCSS.addRightSelect}`}  onChange={(e) => changeValue("estado",e)}>
                    {typesStatus.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                </Form.Select>
              </div>
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Producto:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select value={proyectoActual.producto} disabled={disabled} className={` 
                    ${detalleProjectCSS.input} ${detalleProjectCSS.addRightSelect}`}  onChange={(e) => changeProducto("producto",e)}>
                    {productos.map((type: any, index: number) => <option key={index} value={type.name}>{type.name}</option>)}
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
              <Form.Label className={detalleProjectCSS.label}>Lider asignado:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
              <Form.Select value={lider} disabled={disabled} className={` 
                    ${detalleProjectCSS.input} ${detalleProjectCSS.addRightSelect}`}  onChange={(e) => changeValue("lider",e)}>
                    {recursos.map((recurso: RecrusoSoporte, index: number) => <option key={recurso.file} value={index}>{recurso.name}  {" "} {recurso.lastname}</option>)}
                </Form.Select>
              </div>
            </div>
          </Col>
        </Row>

        </form>
      </div>
      <Row className={detalleProjectCSS.col8} md={40} lg={40} m={40}>

        <Col className={detalleProjectCSS.col8} md={20} lg={20} m={20}>
         <Link className={detalleProjectCSS.styleNavButton} to={"/proyectos/crear_tarea/"+id+"/"} state={{}}><div className={detalleProjectCSS.button}>
          <p>NUEVA TAREA</p>
        </div></Link>
          <div className={`${detalleProjectCSS.contentTaskprojects} ${(proyecto) ? detalleProjectCSS.uninformation : ''}`}/>

          <div className={`${detalleProjectCSS.contentTaskprojects} ${(tareas&&tareas.length===0) ? detalleProjectCSS.uninformation : ''}`}>
            {((tareas)&& !(Object.keys(tareas).length === 0)) && <Table responsive bordered >
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Nombre de tarea</td>
                  <td>Horas Estimadas</td>
                  <td>Fecha de creacion</td>
                  <td>Mas informacion</td>
                </tr>
              </thead>
              <tbody>
                
                {tareas&&tareas.map((tarea: Tarea, index: number) => <tr key={index}>
                  <td>{tarea.id}</td>
                  <td>{tarea.nombre}</td>

                  <td>{tarea.horasEstimadas}</td>
                  <td>{tarea.fechaCreacion}</td>
                  <td>
                  <div className={projectsCSS.contentItem}>
                    <Link className={projectsCSS.styleNav} to={'/proyectos/tarea/' + String(tarea["id"])} state={{ tarea }}><FaEye /></Link>
                    
                    <Link className={projectsCSS.styleNav} to={`#`} onClick={() => { if (window.confirm('Se eliminara la tarea ' +tarea["nombre"] )) {deleteTarea(String(tarea["id"])) }; }}><FaTrash /></Link>
                  </div>
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







