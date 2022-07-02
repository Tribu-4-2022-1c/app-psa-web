export interface Tarea {
    id: string,
    horasEstimadas: string,
    nombre: string,
    fechaCreacion: string,
    recursoAsignado: Lider;
    estado: string,
    prioridad: string,
    objetivo: string,
    recursosAsignados: Array<Lider>,
    proyectoID: string
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
    tipo: string
  }