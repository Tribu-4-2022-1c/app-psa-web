export interface Ticket {
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
    closureMotive: string;
    resolution:    string;
    responsible: string,
  }

  export interface StatusTicket {
    code:          Status;
    title:         Status;
    description:   Status;
    type:          Status;
    client:        Status;
    version:       Status;
    severity:      Status;
    status:        Status;
    creationDate:  Status;
    lastUpdated:   Status;
    closureMotive: Status;
    resolution:    Status;
    responsible: Status,
  }

  export interface Status {
    isValid:boolean,
    wasOnFocus:boolean,
    onFocus:boolean
  }