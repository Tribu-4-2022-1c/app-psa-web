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

  const getProducts = async () => {
    const url = "";
    return fetch(url).then( async (response) => {
      if(response){
        return products;
      }else{
        return []
      }
    })
   .catch( error => {
      console.log(error);
      return []
   })
  }

  const getVersiones = (productSelect:any) => {
    const url = "" ;
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
      console.log(error);
      return []
   })
  }

  return {
    getProducts,
    getVersiones
  }
}

export default soporteService /*= {

}*/
