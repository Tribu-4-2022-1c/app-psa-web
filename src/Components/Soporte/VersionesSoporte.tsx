/*import React, { useEffect, useState } from 'react'
import { VersionSoporte } from './VersionSoporte';

export const VersionesSoporte = (props:any) => {
    const {setcurrentVersion} = props;
    const {product} = props;
    const {versions} = props;
    const [filterVersions, setfilterVersions] = useState([]);
    useEffect(() => {
      const element =  () => {
        let filterVersions = versions.filter( (version:any) => version['product'] === product['name']);
        console.log(filterVersions);
        setfilterVersions(filterVersions);
      }
      element();
    }, []);
    
  return (
    <div>
      {(filterVersions&&filterVersions.length>0)&&<div>
        {filterVersions.map( (version:any,index:number) => 
          <VersionSoporte currentVersion={filterVersions} setcurrentVersion={setcurrentVersion} key={index} version = {version} />
        )} 
      </div>}
       
    </div>
  )
}*/
import React from 'react'

export const VersionesSoporte = (props:any) => {
  return (
    <div>VersionesSoporte</div>
  )
}
