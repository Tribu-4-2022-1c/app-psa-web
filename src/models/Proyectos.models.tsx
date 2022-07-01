export interface Tarea {
    code:          number;
    title:         string;
    description:   string;
    type:          string;
    client:        string;
    version:       string;
    severity:      string;
    status:        string;
    creationDate:  string;
    lastUpdated:   string;
    closureMotive: null;
    resolution:    string;
  }

  export interface Proyecto {
    id:          number;
    nombre:         string;
    tipo:   string;
    cliente:        string;
    alcance:  string;
    version:          string;
    descripcion:        string;
    tareas:    Array<Tarea>;
    horaEstimada:       string;
    fecha_inicio:   string;
    fecha_fin: string;
    estado: string;
    lider: Lider;

  }

  export interface Lider{
    id: number;
    name: string;
  }