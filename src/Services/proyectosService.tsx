
const proyectosService = () => {

  const getAllTasks = () => {
    const url = `https://psa-api-proyectos.herokuapp.com/tareas`;
    return fetch(url)
    .then( async (response) => {
      //return tickets;
      if(response){
        return response.json();
      }else{
        return [];
      }
    })
    .catch( (error) => {
      console.log(error);
      return [];
    })
  }

  const getAllProjects = () => {
    const url = "https://psa-api-proyectos.herokuapp.com/proyectos";
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
  const updateproject = () => {
  }

  const getprojectsTask = () => {
    const url = "https://psa-api-soporte.herokuapp.com/tickettasks";
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

  return {
    getAllProjects,
    getAllTasks,
    updateproject,
    getprojectsTask,
  }
}

export default proyectosService;
