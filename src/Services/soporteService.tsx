import { Task, TaskSoporte, Ticket } from "../models/Soporte.models";
const soporteService = () => {
  const states = [
   { id:'Pendiente',value:'Pendiente'},
    { id:'En_desarrollo',value:'En desarrollo'},
    { id:'Esperando_info_en_cliente',value:'Esperando info en cliente'},
    { id:'Bloqueado',value:'Bloqueado'},
    { id:'Cerrado',value:'Cerrado'},
    { id:'Cancelado',value:'Cancelado'}
  ]
  const prioridadProyecto = [
    'Alta',
    'Baja',
    'Media'
  ]
  const typesTickets = [
    'CONSULTA', 'ERROR', 'MEJORA'
  ]
  const getAllTickets = (product:string='',version:string='') => {
    const url = `https://psa-api-soporte.herokuapp.com/tickets`;
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

  const getStates = () => {
    return states;
  }

  const getTypesTickets = () => {
    return typesTickets;
  }

  const getTickets = (version:string='') => {
    const url = `https://psa-api-soporte.herokuapp.com/versions/${version}/tickets`;
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

  const getSeverities = () => {
    const url = `https://psa-api-soporte.herokuapp.com/severities`;
    return fetch(url)
    .then( async (response) => {
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

  const getEmployees = () => {
    const url = "https://psa-api-soporte.herokuapp.com/employees";
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

  const getAllClients = () => {
    const url = 'https://psa-api-soporte.herokuapp.com/clients';
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
  
  const getProducts = async () => {
    const url = "https://psa-api-soporte.herokuapp.com/products";
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

  const getAllVersiones = () => {
    const url = "https://psa-api-soporte.herokuapp.com/versions";
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

  const getTicketsTask = (code:number) => {
    const url = `https://psa-api-soporte.herokuapp.com/tickets/${code}/tickettasks`;
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

  const updateTicket =(body:Ticket) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    const url = `https://psa-api-soporte.herokuapp.com/tickets/${body.code}`;
    return fetch(url,requestOptions).then( async (response) => {
      if(response){
        return response.json();
      }
      else{
        return false;
      }
    })
    .catch( (error) => {
      console.log(error);
      return false;
    })
  }

  const postTicket = (body:Ticket) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }
    const url = `https://psa-api-soporte.herokuapp.com/tickets`;
    return fetch(url,requestOptions).then( async (response) => {
      if(response){
        return response.json();
      }
      else{
        return false;
      }
    })
    .catch( (error) => {
      console.log(error);
      return false;
    })
  }

  const addTaskProyectos = (body:Task) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }
    const url = `https://api-psa-proyectos-squad-12.herokuapp.com/tareas`;
    return fetch(url,requestOptions).then( async (response) => {
      if(response){
        return response.json();
      }
      else{
        return false;
      }
    })
    .catch( (error) => {
      console.log(error);
      return false;
    })
  }

  const saveTaskSoporte = (body:TaskSoporte) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }
    const url = `https://psa-api-soporte.herokuapp.com/tickettasks`;
    return fetch(url,requestOptions).then( async (response) => {
      if(response){
        return response.json();
      }
      else{
        return false;
      }
    })
    .catch( (error) => {
      console.log(error);
      return false;
    })
  }

  const getProyects = () => {
    const requestOptions = {
      method: 'GET',
      headers: { Accept:"application/json",
      "content_type": "application/json"},
    }
    const url = 'https://api-psa-proyectos-squad-12.herokuapp.com/proyectos';
    return fetch(url,requestOptions).then( async (response) => {
      if(response){
        return response.json();
      }
      else{
        return [];
      }
    })
    .catch( (error) => {
      console.log(error);
      return [];
    })
  }

  const getTaskProyectos = (idTask:Task) => {
    const url = `https://api-psa-proyectos-squad-12.herokuapp.com/tareas/${idTask}`;
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
    return fetch(url).then( async (response) => {
      if(response){
        return response.json();
      }
      else{
        return [];
      }
    })
    .catch( (error) => {
      console.log(error);
      return [];
    })
  }

  const getTasksProyectos = () => {
    const url = `https://api-psa-proyectos-squad-12.herokuapp.com/tareas`;
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
    return fetch(url).then( async (response) => {
      if(response){
        return response.json();
      }
      else{
        return [];
      }
    })
    .catch( (error) => {
      console.log(error);
      return [];
    })
  }

  const addTask = (body:Task) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }
    const url = `https://api-psa-proyectos-squad-12.herokuapp.com/tickettasks`;
    return fetch(url,requestOptions).then( async (response) => {
      if(response){
        return response.json();
      }
      else{
        return [];
      }
    })
    .catch( (error) => {
      console.log(error);
      return [];
    })
  }
  //ToDo: Traer proyectos Hacer el POST:"proyectoID": null
  //Redirigir a http://localhost:3000/proyectos/${idProyecto}

  return {
    getProducts,
    getAllVersiones,
    getAllTickets,
    getAllClients,
    getEmployees,
    getSeverities,
    updateTicket,
    getTicketsTask,
    getTickets,
    postTicket,
    getStates,
    getTypesTickets,
    addTask,
    getProyects,
    getTaskProyectos,
    addTaskProyectos,
    saveTaskSoporte,
    getTasksProyectos
  }
}

export default soporteService;
