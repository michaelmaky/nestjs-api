// https://docs.mongodb.com/manual/reference/connection-string/#components

export interface ConnectionComponents {
  // required fields
  port: number;
  dbName: string;
  hosts: string[];

  // optional fields
  isSRV?: boolean;
  isSSL?: boolean;
  username?: string;
  password?: string;
  replicaSet?: string;
  retryWrites?: boolean;
}
