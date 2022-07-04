export interface Tarea {
    id: number,
    horasEstimadas: number,
    nombre: string,
    fechaCreacion: string,
    recursoAsignado: Lider;
    estado: string,
    prioridad: string,
    objetivo: string,
    recursosAsignados: Array<Lider>,
    proyectoID: number
  }

  export interface Proyecto {
    id:          string;
    nombre:      string;
    tipo:        string;
    cliente:     string;
    alcance:     string;
    version:     string;
    descripcion: string;
    tareas:      Array<Tarea>;
    horaEstimada:number;
    fecha_inicio:string;
    fecha_fin:   string;
    estado:      string;
    lider:       Lider;
    producto:    string;

  }
  export interface ProyectoSinLider {
    id:          string;
    nombre:      string;
    tipo:        string;
    cliente:     string;
    alcance:     string;
    version:     string;
    descripcion: string;
    tareas:      Array<Tarea>;
    horaEstimada:number;
    fecha_inicio:string;
    fecha_fin:   string;
    estado:      string;
    producto:     string;
  }


  export interface Lider{
    id: number;
    name: string;
  }

  export interface Patch{
    estado: string,
    nombre: string,
    version: string,
    descripcion: string,
    tipo: string,
    producto: string
  }

  export interface TicketTask{
      id: {
        task: string,
        ticket: string
      }
  }

  export interface TicketModel{
    client: string,
    closureMotive: string,
    code: 0,
    creationDate: string,
    description: string,
    lastUpdated: string,
    resolution: string,
    responsible: string,
    severity: string,
    status: string,
    title: string,
    type: string,
    version: string
  }