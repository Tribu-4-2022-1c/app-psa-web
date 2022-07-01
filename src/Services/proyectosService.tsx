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
    return{
        getAllTaksFor,
        getProyectoFor
    }
}
export default ProyectoService
