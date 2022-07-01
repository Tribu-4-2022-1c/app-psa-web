import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import MenuDescription from './MenuDescription'

export const TicketDetalle = (props:any) => {
    const location = useLocation();
    const { ticket, version, product, severities, employees }: any = location.state;
    const [flagGenerateTask, setflagGenerateTask] = useState(false);
    const [show, setshow] = useState(false);

    const generateTask = () => {
        setshow(true);
      }

  return (
    <div>
        <MenuDescription version={version} product={product} flagGenerateTask={flagGenerateTask} functionGenerateTask={generateTask} />
    </div>
  )
}
