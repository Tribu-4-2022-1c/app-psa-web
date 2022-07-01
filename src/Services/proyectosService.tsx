import { Patch } from "../models/Proyectos.models"

const HerokuUrl = "https://api-psa-proyectos-squad-12.herokuapp.com/proyectos"
const LocalUrl = "http://localhost:8080/proyectos"

const URL = LocalUrl

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
    return{
        getAllTaksFor,
        getProyectoFor,
        actualizarProyecto
    }
}
export default ProyectoService
