import React from 'react';
import { FaProjectDiagram } from 'react-icons/fa';
import versionSoporteStyle from '../Soporte/VersionSoporte.module.css';
export const VersionSoporte = (props:any) => {
    const {version} = props;
    const {currentVersion} = props;
    const {setcurrentVersion} = props;
    const selectVersion = () => {
      setcurrentVersion(version);
    }
  return (
    <div onClick={() => selectVersion()} className={`${versionSoporteStyle.card} 
      ${(currentVersion && currentVersion.id === version.id)?versionSoporteStyle.isSelected:''}`}>
          <div>
            <p className={versionSoporteStyle.label}>Número de Versión:</p>
            <p className={versionSoporteStyle.descItem}>{version.id}</p>
          </div>
          <div className={versionSoporteStyle.contentIcon}>
            <FaProjectDiagram />
          </div>
        </div>
  )
}
