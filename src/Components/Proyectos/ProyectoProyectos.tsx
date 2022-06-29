import React, { useState } from 'react'
import { Card, Col, Form, Row, Table } from 'react-bootstrap';
import { FaCalendar, FaEye } from 'react-icons/fa';
import MenuDescription from './MenuDescription';
import detalleProjectCSS from '../../Styles/Proyectos/Detalle.module.css';
import { Proyecto } from "../../models/Proyectos.models";
import CardHeader from 'react-bootstrap/esm/CardHeader';
export const ProyectoProyectos = (props: any) => {

  const initialProject: Proyecto = {
    code: 0,
    name: '',
    description: '',
    lead: '',
    startDate: '',
    type: '',
    status: '',
    product: '',
    version: '',
    customization: '',
  
  }
  const typesProject = [
    'IMPLEMENTACION', 'DESARROLLO'
  ]

  const typesStatus = [
    'PENDIENTE', 'ASIGNADO', 'FINALIZADO'
  ]

  const [projectCurrent, setprojectCurrent] = useState(initialProject);
  const [disabled, setdisabled] = useState(false);
  const { proyecto } = props;

  const changeValue = (prop: string, value: any) => {
    setprojectCurrent({ ...projectCurrent, [prop]: value.target.value });
  }

  return (
    <div>
      <MenuDescription proyecto={proyecto} title={"Proyecto"} />
      <div>
        <Row className={detalleProjectCSS.contentRow}>
          <Col className={detalleProjectCSS.col4} md={6} lg={6} m={6}>
            <div>
              <Form.Label className={detalleProjectCSS.label} htmlFor="name">Nombre:</Form.Label>
              <Form.Control
                className={`${(disabled) ? (detalleProjectCSS.disabled && detalleProjectCSS.removeCorner) : ''}`}
                as="textarea"
                id="name"
                disabled={disabled}
                value={" "}
                onChange={(value) => changeValue('nombre', value)} />

              <Form.Label className={detalleProjectCSS.label} htmlFor="inputPassword5">Descripción:</Form.Label>
              <Form.Control
                className={`${(disabled) ? (detalleProjectCSS.disabled && detalleProjectCSS.removeCorner) : ''}`}
                as="textarea"
                id="description"
                rows={8}
                disabled={disabled}
                value={" "}
                onChange={(value) => changeValue('description', value)} />
            </div>
          </Col>
          <Col className={detalleProjectCSS.col8} md={6} lg={6} m={6}>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Lider:</Form.Label>
              <Form.Control
                className={`${(disabled) ? detalleProjectCSS.disabled : ''} ${detalleProjectCSS.input}`}
                type="text"
                id="lead"
                disabled={disabled}
                value={" "}
                onChange={(value) => changeValue('client', value)}
              />
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Fecha de inicio de Proyecto:</Form.Label>

              <FaCalendar className={`${detalleProjectCSS.icon}  ${detalleProjectCSS.calendar}`} />
              <Form.Control
                className={`${(disabled) ? detalleProjectCSS.disabled : ''} ${detalleProjectCSS.input}`}
                type="text"
                id="startDate"
                disabled={disabled}
                value={" "}
                onChange={(value) => changeValue('creationDate', value)}
              />
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Tipo:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select value={detalleProjectCSS.type} disabled={disabled} className={` 
                    ${detalleProjectCSS.input} ${detalleProjectCSS.addRightSelect}`} onChange={(value) => changeValue('type', value)}>
                  {typesProject.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                </Form.Select>
              </div>
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Estado:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select value={detalleProjectCSS.type} disabled={disabled} className={` 
                    ${detalleProjectCSS.input} ${detalleProjectCSS.addRightSelect}`} onChange={(value) => changeValue('type', value)}>
                  {typesStatus.map((type: any, index: number) => <option key={index} value={type}>{type}</option>)}
                </Form.Select>
              </div>
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Producto:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select >
                </Form.Select>
              </div>
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Version:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select >
                </Form.Select>
              </div>
            </div>
            <div className={detalleProjectCSS.contentItem}>
              <Form.Label className={detalleProjectCSS.label}>Customizacion:</Form.Label>
              <div className={detalleProjectCSS.contentInput}>
                <Form.Select >
                </Form.Select>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Row className={detalleProjectCSS.col8} md={6} lg={6} m={6}>
        <Col className={detalleProjectCSS.col8} md={6} lg={6} m={6}>
          <div className={`${detalleProjectCSS.contentTaskprojects} ${(proyecto && proyecto.length === 0) ? detalleProjectCSS.uninformation : ''}`}>
            {(proyecto && proyecto.length > 0) && <Table responsive bordered >
              <thead>
                <tr>
                  <td>project</td>
                  <td>Ir a Tarea</td>
                </tr>
              </thead>
              <tbody>
                {proyecto.map((project: any, index: number) => <tr key={index}>
                  <td>
                    {project.id.project}
                  </td>
                  <td>
                    <FaEye />
                  </td>
                </tr>)}
              </tbody>
            </Table>}
            {((proyecto && (proyecto.length === 0)) || !proyecto) &&
              <Card className={detalleProjectCSS.contentCard}>
                <CardHeader>
                  No hay Tareas Asociadas a este Proyecto
                </CardHeader>
              </Card>
            }
          </div>
        </Col>
      </Row>
    </div>
  )
}


