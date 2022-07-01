import { useEffect, useState } from 'react';
import { ProyectosProyectos } from '../Components/Proyectos/ProyectosProyectos';
const URL = "http://localhost:8080/proyectos"
const HerokuUrl = "https://api-psa-proyectos-squad-12.herokuapp.com/proyectos"
const ProyectosPage = () => {
  const [proyectos, setProyectos] = useState([]);

  useEffect (() => {
    fetch(URL, {
      method: "GET",
      headers:{
        Accept:"application/json",
        "content_type": "application/json"
      },
    })
    .then((res) => res.json())
    .catch((error) => console.error("Error",error))
    .then((response) => {
      setProyectos(response)
    })
  }, [])
  return (
    <div><ProyectosProyectos proyecto = {proyectos}/></div >
  )

}
export default ProyectosPage;