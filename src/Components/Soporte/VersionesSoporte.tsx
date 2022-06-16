import { version } from 'os';
import React, { useEffect, useState } from 'react'
import soporteService from '../../Services/soporteService';
import { VersionSoporte } from './VersionSoporte';

export const VersionesSoporte = (props:any) => {
    const {productSelect} = props;
    const {setcurrentVersion} = props;
    const {currentVersion} = props;
    const [versions, setversions] = useState([]);
    useEffect(() => {
      const versiones = async () => {
        const list:any = await soporteService().getVersiones(productSelect);
        setversions(list);
        setcurrentVersion(list[0]);
      }
      versiones();
    }, [productSelect]);
    
  return (
    <div>
      <h3>VERSIONES: {(productSelect.id!=='')?productSelect['id']:"No Hay Producto Seleccionado"}</h3>
      {(versions&&versions.length>0)&&<div>
        {versions.map( (version,index:number) => 
          <VersionSoporte currentVersion={currentVersion} setcurrentVersion={setcurrentVersion} key={index} version = {version} />
        )} 
      </div>}
       
    </div>
  )
}