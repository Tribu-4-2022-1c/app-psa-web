
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Patch, Proyecto, ProyectoSinLider, RecrusoSoporte } from '../../models/Proyectos.models';
import detalleProjectCSS from '../../Styles/Proyectos/Detalle.module.css';
import tareasCSS from "../../Styles/Proyectos/TareasProyectos.module.css";
import MenuDescription from './MenuDescription';
import ProyectoCrearCSS from '../../Styles/Proyectos/ProyectoCrear.module.css';
import { FaCalendar } from 'react-icons/fa';
import ProyectoService from '../../Services/proyectosService';


const ProyectoCrear = (props: any) =>{

    const [disabled, setdisabled] = useState(false);
    const [elementosVacios, setElementosVacios] = useState(false);
    const [asignar_lider, setASignarLider] = useState(false);
    let [recursos,setRecursos] = useState<Array<RecrusoSoporte>>([])
    
    const proyectoInicial: Proyecto = {
        id: "",
        nombre:      "",
        tipo:        "DESARROLLO",
        cliente:     "",
        alcance:     "",
        version:     "",
        descripcion: "",
        tareas:      [],
        horaEstimada: 0,
        fecha_inicio: "",
        fecha_fin:   "",
        estado:      "PENDIENTE",
        producto:    "PSA Spring CRM",
        lider:       {
          id_recurso: 1,
          name: "Un Lider"
        
        }
      }

  const [proyectoActual, setProyectoActual] = useState(proyectoInicial)
  const [lider,setLider] = useState(1)

  const changeValue = (prop: string, value: any) => {
    if(prop == "lider"){
      setProyectoActual({...proyectoActual,[prop]:{
        "id_recurso": recursos[value.target.value].file,
        "name": recursos[value.target.value].name + " "+ recursos[value.target.value].lastname
      }})
      setLider(value.target.value)
      return
    }
        setElementosVacios(false)
        setProyectoActual({ ...proyectoActual, [prop]: value.target.value });
        if (prop === "estado"){
            if ( value.target.value === "ASIGNADO"){
            setASignarLider(true)
            }
            else{
                setASignarLider(false)
            }
        }
      }
      
  const updateData = async () => {
    const response = await ProyectoService().actualizarProyecto(proyectoActual);
    console.log(response)

  }    

  const [productos,setProductos] = useState([])


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


  const typesProject = [
    'IMPLEMENTACION', 'DESARROLLO'
  ]

  const typesStatus = [
    'PENDIENTE', 'ASIGNADO', "En curso"
  ]
  function clickGuardar(e: { preventDefault: () => void; }) {
    e.preventDefault()
    if (proyectoActual.nombre ==="" || proyectoActual.descripcion === ""){
        setElementosVacios(true)
        return false;
    }
    console.log(proyectoActual)
    ProyectoService().postProyecto(proyectoActual)
  }

  const changeProducto = (prop: string, value: any) => {
    setProyectoActual({ ...proyectoActual, [prop]: value.target.value });
    console.log(proyectoActual)
    
  }



    const handelSubmit = (e: { preventDefault: () => void; }) =>{

    }

    return( 
    <div>
        <MenuDescription title = "Crear un nuevo proyecto"/>
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
                value={proyectoActual.nombre}
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
                <Form.Label className={detalleProjectCSS.label} htmlFor="inputPassword5">Alcance:</Form.Label>
                <Form.Control
                className={`${(disabled) ? (detalleProjectCSS.disabled && detalleProjectCSS.removeCorner) : ''}`}
                as="textarea"
                id="alcance"
                rows={8}
                disabled={disabled}
                defaultValue={proyectoActual.alcance}
                onChange={(e) => changeValue("alcance",e)} />
            </div>
          </Col>
          <Col className={detalleProjectCSS.col8} md={6} lg={6} m={6}>
          <div className={detalleProjectCSS.contentItem}>
                {<Button  type="submit" className={detalleProjectCSS.iconSave} onClick={(e) => clickGuardar(e)} variant="success">Guardar</Button>}
                
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
                disabled={disabled}
                defaultValue={proyectoActual.fecha_inicio}
                onChange={(value) => changeValue('fecha_inicio', value)}
              />
              <FaCalendar className={`${detalleProjectCSS.icon}  ${detalleProjectCSS.calendar}`} />
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Tipo:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select value={detalleProjectCSS.type} disabled={disabled} className={` 
                    ${detalleProjectCSS.input} ${detalleProjectCSS.addRightSelect}`} defaultValue = {typesProject[1]} onChange={(e) => changeValue("tipo",e)}>
                  {typesProject.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                </Form.Select>
              </div>
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Estado:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select value={detalleProjectCSS.type} disabled={disabled} className={` 
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
                <Form.Select >
                </Form.Select>
              </div>
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Lider:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
              <Form.Select value={lider} disabled={disabled} className={` 
                    ${detalleProjectCSS.input} ${detalleProjectCSS.addRightSelect}`}  onChange={(e) => changeValue("lider",e)}>
                    {recursos.map((recurso: RecrusoSoporte, index: number) => <option key={recurso.file} value={index}>{recurso.name}  {" "} {recurso.lastname}</option>)}
                </Form.Select>
              </div>
            </div>
            {false && asignar_lider && <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Lider:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>

              </div>

            </div>
            }
          </Col>
        </Row>

        {elementosVacios &&
          <div>
            Hay elementos vacios
          </div>
        }
        </form>
      </div>
    </div>
    )
}


export default ProyectoCrear;
