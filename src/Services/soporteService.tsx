
const soporteService = () => {

  const tickets = [
    {
      id:"Version 6",
      codigo:"1",
      titulo:"",
      estado:"",
      fechaDeCreacion:"23/12/2021",
      fechaDeActualizacion:"",
      FechaDeResolucionEstimada:"30/12/2021",
      severidad:"S3",
      cliente:"1",
      responsable:"3",
      tipo:'',
      description:''
    },
    {
      id:"Version 6",
      codigo:"0",
      titulo:"",
      estado:"",
      fechaDeCreacion:"23/11/2022",
      fechaDeActualizacion:"",
      FechaDeResolucionEstimada:"30/12/2021",
      severidad:"S3",
      cliente:"1",
      responsable:"3",
      tipo:'',
      description:''
    },
    {
      id:"Version 6",
      codigo:"2",
      titulo:"",
      estado:"",
      fechaDeCreacion:"23/10/2021",
      fechaDeActualizacion:"",
      FechaDeResolucionEstimada:"24/10/2021",
      severidad:"S1",
      cliente:"3",
      responsable:"2",
      tipo:'',
      description:''
    },
    {  
      id:"Version 6",
      codigo:"3",
      titulo:"",
      estado:"",
      fechaDeCreacion:"23/09/2021",
      fechaDeActualizacion:"",
      FechaDeResolucionEstimada:"24/09/2021",
      severidad:"S1",
      cliente:"1",
      responsable:"1",
      tipo:'',
      description:''
    }
    ,
    {  
      id:"Version 6",
      codigo:"4",
      titulo:"",
      estado:"",
      fechaDeCreacion:"23/08/2021",
      fechaDeActualizacion:"",
      FechaDeResolucionEstimada:"26/08/2021",
      severidad:"S2",
      cliente:"2",
      responsable:"1",
      tipo:'',
      description:''
    }
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
      return tickets;
      /*return [];*/
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
      return tickets;
      /*return [];*/
    })
  }

  const getEmployees = () => {
    const url = "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/recursos-psa/1.0.0/m/api/recursos";
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
    const url = 'https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes';
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

  return {
    getProducts,
    getAllVersiones,
    getAllTickets,
    getAllClients,
    getEmployees,
    getSeverities
  }
}

export default soporteService;
