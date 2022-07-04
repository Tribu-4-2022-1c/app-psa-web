import { Link } from 'react-router-dom';
import tareasCSS from "../../Styles/Proyectos/TareasProyectos.module.css";


const MenuDescription = (props: any) => {

  const { proyecto, title, flagGenerateProyecto, flagGenerateTask } = props;

  return (
    <div className={tareasCSS.contentDetail}>
      <div className={tareasCSS.contenDescription}>
        <div className={tareasCSS.item}>
          <p className={tareasCSS.label}>{title}</p>
          <p className={tareasCSS.input}>{proyecto}</p>
        </div>
      </div>
      <div className={tareasCSS.contentButton}>
        {flagGenerateProyecto && <Link className={tareasCSS.styleNav} to={`/proyectos/crear_proyecto`} state={{}}><div className={tareasCSS.button}>
          <p>NUEVO PROYECTO</p>
        </div></Link>}
        {flagGenerateTask && <Link className={tareasCSS.styleNav} to={`/proyectos/crear_tarea`} state={{}}><div className={tareasCSS.button}>
          <p>NUEVA TAREA</p>
        </div></Link>}
      </div>

    </div>
  )
}

export default MenuDescription;