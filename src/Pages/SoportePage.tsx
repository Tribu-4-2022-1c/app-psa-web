import React from 'react'
import soporteCSS from '../Styles/Soporte.module.css';
import { useEffect, useState } from 'react';
import soporteService from '../Services/soporteService';
import { VersionesSoporte } from '../Components/Soporte/VersionesSoporte';
import ProductoSoporte from '../Components/Soporte/ProductoSoporte';
import { LoadComponent } from '../Components/LoadComponent';

const SoportePage = () => {

  const initialStateVersion = {
    id: ''
  }
  const winHeight =  window.innerHeight*.8;
  
  const [products, setproducts] = useState([]);
  const [currentVersion, setcurrentVersion] = useState(initialStateVersion);
  const [versions, setversions] = useState([]);
  const [load, setload] = useState(true);
  

  useEffect(() => {
    const getProducts = async () => {
      let listProducts = await getAllProducts();
      setproducts(listProducts);
      const versions = await getAllVersion();
      setversions(versions);
      setload(false);
    }
    getProducts();
    
  }, []);

  const getAllProducts = async () => {
    let listProducts: any = await soporteService().getProducts();
    return listProducts;
  }

  const getAllVersion = async () => {
    let listVersions: any = await soporteService().getAllVersiones();
    return listVersions;
  }

  return (
    <div className={soporteCSS.content}>
      <LoadComponent load={load} winHeight={winHeight} setload soporteCSS={soporteCSS} />
      {!load&&products.map((product,index) => <div key={index}>
        <ProductoSoporte product={product} />
        <div>
          <VersionesSoporte versions={versions} product={product} currentVersion = {currentVersion} setcurrentVersion={setcurrentVersion} />
        </div>
      </div>)}
    </div >
  )
}

export default SoportePage;