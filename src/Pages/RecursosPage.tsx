import recursosCSS from '../Styles/Recursos/Recursos.module.css';
import { useEffect, useState } from 'react';
import soporteService from '../Services/soporteService';
import { VersionesSoporte } from '../Components/Soporte/VersionesSoporte';
import ProductoSoporte from '../Components/Soporte/ProductoSoporte';
import LoginButton from '../Components/Recursos/LoginButton';
import { Audio } from 'react-loader-spinner';

const RecursosPage = () => {

  const initialStateVersion = {
    id: ''
  }
  const winHeight =  window.innerHeight*.8;
  const loginButton = useState();    
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
    <div className={recursosCSS.content}>
      {load&&<div style={{height: winHeight}} className={`${recursosCSS.contentAudio}`}>
          <Audio
          height="50"
          width="50"
          color='#003066'
          ariaLabel='loading'
        />
        </div>}
        {!load && 
      
      <div >
         <LoginButton loginButton={loginButton} /> 
      </div>
      
      }
      {!load&&products.map((product,index) => <div key={index}>
        <ProductoSoporte product={product} />
        <div>
          <VersionesSoporte versions={versions} product={product} currentVersion = {currentVersion} setcurrentVersion={setcurrentVersion} />
        </div>
      </div>)}
    </div >
  )
}

export default RecursosPage;