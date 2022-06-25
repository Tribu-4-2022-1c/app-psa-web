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
    closureMotive: null;
    resolution:    string;
  }