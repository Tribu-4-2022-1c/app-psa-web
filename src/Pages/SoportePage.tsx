import React from 'react'
import soporteCSS from '../Styles/Soporte.module.css';
import { useEffect, useState } from 'react';
import soporteService from '../Services/soporteService';
import { VersionesSoporte } from '../Components/Soporte/VersionesSoporte';
import ProductoSoporte from '../Components/Soporte/ProductoSoporte';
import { Audio } from 'react-loader-spinner';

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
      {load&&<div style={{height: winHeight}} className={`${soporteCSS.contentAudio}`}>
          <Audio
          height="50"
          width="50"
          color='#003066'
          ariaLabel='loading'
        />
        </div>}
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