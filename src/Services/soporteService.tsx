import React from 'react';
import { Ticket } from "../models/Soporte.models";
const soporteService = () => {

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
    const url = "https://psa-api-soporte.herokuapp.com/soporte/recursos";
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
    const url = 'https://psa-api-soporte.herokuapp.com/soporte/clientes';
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

  const getTicketsTask = () => {
    const url = "https://psa-api-soporte.herokuapp.com/tickettasks";
    return fetch(url).then( async (response) => {
      if(response){
        return []//response.json();
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
        response.json();
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

  return {
    getProducts,
    getAllVersiones,
    getAllTickets,
    getAllClients,
    getEmployees,
    getSeverities,
    updateTicket,
    getTicketsTask,
    getTickets
  }
}

export default soporteService;
