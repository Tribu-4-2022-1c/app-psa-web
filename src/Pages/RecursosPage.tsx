import React from 'react'

import { Audio } from 'react-loader-spinner';

import { useEffect, useState } from 'react';

import recursosCSS from '../Styles/Recursos.module.css';

const RecursosPage = () => {

  const [load, setload] = useState(true);

  const winHeight =  window.innerHeight*.8;

  return (
    <div >
      {load&&<div style={{height: winHeight}} className={`${recursosCSS.contentAudio}`}>
          <Audio
          height="50"
          width="50"
          color='#003066'
          ariaLabel='loading'
        />
        </div>}
    </div >
  )
}

export default RecursosPage;