import React from 'react'
import { useParams } from 'react-router-dom';

export const Tickets = (props:any) => {
    const {product} = useParams();
    const {version} = useParams();
  return (
    <div>{product}</div>
  )
}
