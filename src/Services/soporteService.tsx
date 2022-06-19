import React from 'react'

const soporteService = () => {

  const products = [
    {
      id:"Producto 1"
    },
    {
      id:"Producto 2"
    },
    {  
      id:"Producto 3"
    }
    
  ]
  const versions1 = [
    {
      id:"Version 1"
    },
    {
      id:"Version 2"
    },
    {  
      id:"Version 3"
    }
  ]
  const versions2 = [
    {
      id:"Version 4"
    },
    {
      id:"Version 5"
    },
  ]
  const versions3 = [
    {
      id:"Version 6"
    },
    {
      id:"Version 7"
    },
    {
      id:"Version 8"
    },
    {  
      id:"Version 9"
    }
    ,
    {  
      id:"Version 10"
    }
  ]

  const tickets = [
    {
      id:"Version 6"
    },
    {
      id:"Version 7"
    },
    {
      id:"Version 8"
    },
    {  
      id:"Version 9"
    }
    ,
    {  
      id:"Version 10"
    }
  ]
  
  const getProducts = async () => {
    const url = "https://psa-api-soporte.herokuapp.com/products";
    return fetch(url).then( async (response) => {
      if(response){
        return response.json();
      }else{
        return []
      }
    })
   .catch( error => {
      return []
   })
  }

  const getVersiones = (productSelect:any) => {
    const url = "https://psa-api-soporte.herokuapp.com/versions" ;
    return fetch(url).then( async (response) => {
      if(response){
        if(productSelect.id === 'Producto 1')
          return versions1;
        if(productSelect.id === 'Producto 2')
          return versions2;
        if(productSelect.id === 'Producto 3')
          return versions3;
      }
    })
    .catch( error => {
      return []
   })
  }

  const getAllVersiones = () => {
    const url = "https://psa-api-soporte.herokuapp.com/versions";
    return fetch(url).then( async (response) => {
      if(response){
        return response.json();
      }else{
        return []
      }
    })
   .catch( error => {
      return []
   })
  }

  return {
    getProducts,
    getVersiones,
    getAllVersiones
  }
}

export default soporteService /*= {

}*/
