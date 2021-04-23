// https://docs.mongodb.com/manual/reference/connection-string/#connection-string-options
export interface ConnectionOptions {
  authSource?: string;
  replicaSet?: string;
  ssl?: string;
  retryWrites?: string;
}
