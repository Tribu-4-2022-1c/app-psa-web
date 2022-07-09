import { ProyectosProyectos } from "../Components/Proyectos/ProyectosProyectos"
import { Patch, Proyecto, ProyectoSinLider, Tarea } from "../models/Proyectos.models"
import RecursosPage from "../Pages/RecursosPage"

const HerokuUrl = "https://api-psa-proyectos-squad-12.herokuapp.com"
const LocalUrl = "http://localhost:8080/proyectos"

const URL = HerokuUrl
const SoporteURL = "https://psa-api-soporte.herokuapp.com"
let RecursosURL = "https://api-psa-recursos.herokuapp.com"

const ProyectoService = () =>{
    const getAllTaksFor =(id: String = "") =>{
        return fetch(URL + "/proyectos/" + id +"/tareas?id="+id,
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
      return fetch(URL +"/proyectos"+ "/" + id,
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
    return fetch(URL + "/proyectos"+ "/" + id + "/actualizar",
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

    const actualizarTarea = (patch: Tarea, id: String = "") =>{
        
        return fetch(URL + "/tareas"+ "/" + id + "/actualizar",
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
        return fetch(URL+"/proyectos",
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
    
	const removeProyecto = (id: String = "") =>{
	    return fetch(URL + "/proyectos"+ "/" + id,
	    {
		method: "DELETE",
		headers:{
		    Accept:"application/json",
		    "content_type": "application/json"
		  },
	    })
	    .then( () => {
		console.log("Se borro el proyecto")
	    })
	}
	
	 const removeTarea = (id: String = "") =>{
	    return fetch(URL+ "/tareas" + "/" + id,
	    {
		method: "DELETE",
		headers:{
		    Accept:"application/json",
		    "content_type": "application/json"
		  },
	    })
	    .then( () => {
		console.log("Se borro la tarea")
	    })
	}

    const getTareaFor = (id: String = "") =>{
        return fetch(URL +"/tareas"+ "/" + id,
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

    const postTarea = (tarea: Tarea) =>{
        console.log(tarea)
        return fetch(URL +"/tareas",
        {
            method: "POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tarea)
        }).then(() =>{
            console.log("Se creo correctamente el proyecto")
        })
    }

    const getTicketsPara = (id: String = "") =>{
        return fetch(SoporteURL + "/tasks/"+id+"/tickettasks" ,
        {
            method: "GET",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },   
        }).then(async (res) => {
            if (res){
                return res.json();}
            else{
                return [];
            }
            })
        .catch((error) => console.error("Error",error))
    }

    const getAllProductos = () =>{
        return fetch(SoporteURL + "/products" ,
        {
            method: "GET",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },   
        }).then(async (res) => {
            if (res){
                return res.json();}
            else{
                return [];
            }
            })
        .catch((error) => console.error("Error",error))
    }

    const getTicket = (id: String) =>{
        return fetch(SoporteURL+"/tickets/"+id,        
        {
            method: "GET",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },   
        }).then(async (res) => {
            if (res){
                return res.json()
                }
            else{
                return [];
            }
            })    
        .catch((error) => console.error("Error",error))
    }

    const getRecursos = () => {
        return fetch(RecursosURL+"/resources",{
            method: "GET",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },   
        }).then(async (res) => {
            if (res){
                return res.json()
                }
            else{
                return [];
            }
            })    
        .catch((error) => console.error("Error",error))
    }
    









    return{
        getAllTaksFor,
        getProyectoFor,
        actualizarProyecto,
        actualizarTarea,
        postProyecto,
        removeProyecto,
        removeTarea,
        getTareaFor,
        postTarea,
        getTicketsPara,
        getAllProductos,
        getTicket,
        getRecursos
    }
}
export default ProyectoService

