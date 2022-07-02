import React from 'react';

import { FaFolderOpen, FaPlusCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import versionSoporteStyle from '../../Styles/VersionSoporte.module.css'//'../../Styles/Soporte/VersionSoporte.module.css';
export const VersionSoporte = (props:any) => {
    const {version} = props;
    const {currentVersion} = props;
    const {setcurrentVersion} = props;

    const selectVersion = () => {
      setcurrentVersion(version);
    }

    const goDetailTickes = () => {

    }

    const getOpcion = () => {

    }

    const getVersion = (nameVersion:any) => {
      return nameVersion.split('_')[1];
    }

  return (
    <div onClick={() => selectVersion()} className={`${versionSoporteStyle.card} 
      ${(currentVersion && currentVersion.id === version.id)?versionSoporteStyle.isSelected:''}`}>
          <NavLink
            to={`/soporte/${version.product}/${getVersion(version.id)}`}
            className={versionSoporteStyle.styleNav}
          >
          <div className={versionSoporteStyle.contentDescription}>
            
            <p className={versionSoporteStyle.label}>Número de Versión:</p>
            <p className={versionSoporteStyle.descItem}>{getVersion(version.id)}</p>
            <p className={versionSoporteStyle.label}>Fecha de release:</p>
            <p className={versionSoporteStyle.descItem}>{version.release}</p>
          </div></NavLink>
          <div className={versionSoporteStyle.contentIcon} >
          <NavLink
            to={`/soporte/${version.product}/${getVersion(version.id)}`}
            className={versionSoporteStyle.styleNav}
          >
            <FaFolderOpen onClick={() => {goDetailTickes()}} />
          </NavLink>
          {/* <NavLink
            to={`/soporte/${version.product}/${getVersion(version.id)}/crear`}
            className={versionSoporteStyle.styleNav}
          > */}
            <FaPlusCircle onClick={() => {getOpcion()}}  />
          {/* </NavLink>   */}
            
          </div>
        </div>
  )
}
