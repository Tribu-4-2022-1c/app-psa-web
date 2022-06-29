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
    code:          number;
    name:         string;
    description:   string;
    lead:        string;
    startDate:  string;
    type:          string;
    status:        string;
    product:    string;
    version:       string;
    customization:   string;

  }