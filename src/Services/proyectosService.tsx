import { ProyectosProyectos } from "../Components/Proyectos/ProyectosProyectos"
import { Patch, Proyecto, ProyectoSinLider } from "../models/Proyectos.models"

const HerokuUrl = "https://api-psa-proyectos-squad-12.herokuapp.com/proyectos"
const LocalUrl = "http://localhost:8080/proyectos"

const URL = HerokuUrl

const ProyectoService = () =>{
    const getAllTaksFor =(id: String = "") =>{
        return fetch(URL + "/" + id +"/tareas?id="+id,
        {
            method: "GET",
            headers:{
                Accept:"application/json",
                "content_type": "application/json"
              },
        })
        .then(async (res) => {
            if (res){
                return res.json();}
            else{
                return [];
            }
            })
        .catch((error) => console.error("Error",error))
    }
    const getProyectoFor = (id: String = "") =>{
      return fetch(URL + "/" + id,
      {
          method: "GET",
          headers:{
              Accept:"application/json",
              "content_type": "application/json"
            },
      })
      .then(async (res) => {
          if (res){
              return res.json();}
          else{
              return [];
          }
          })
      .catch((error) => console.error("Error",error))
  }


  const actualizarProyecto = (patch: Patch, id: String = "") =>{
    return fetch(URL + "/" + id + "/actualizar",
    {
        method: "PUT",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(patch)
    }).then(() => {
        console.log("Se cambio el proyecto")
    })
    }

    const postProyecto = (proyecto: ProyectoSinLider) =>{
        return fetch(URL,
            {
                method: "POST",
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(proyecto)
            }).then(() =>{
                console.log("Se creo correctamente el proyecto")
            })
    }


    const getAllProjects = () => {
        const url = "https://api-psa-proyectos-squad-12.herokuapp.com/proyectos";
        return fetch(url).then( async (response) => {
            if(response){
                return response.json();
            }else{
                return [];
            }
        })
            .catch( error => {
                console.log(error);
                return [];
            })
    }

    const getProjectByName = (nombre: String = "") => {
        const url = URL + "/obtener-por-nombre?nombre=" + nombre;
        return fetch(url).then( async (response) => {
            if(response){
                return response.json();
            }else{
                return [];
            }
        })
            .catch( error => {
                console.log(error);
                return [];
            })
    }

    const getTaskForProject = (id: String = "") => {
        const url = URL + "/" + id + "/tareas";
        return fetch(url).then( async (response) => {
            if(response){
                return response.json();
            }else{
                return [];
            }
        })
            .catch( error => {
                console.log(error);
                return [];
            })
    }


    return{
        getAllTaksFor,
        getProyectoFor,
        getAllProjects,
        actualizarProyecto,
        postProyecto,
        getProjectByName,
        getTaskForProject
    }
}
export default ProyectoService
