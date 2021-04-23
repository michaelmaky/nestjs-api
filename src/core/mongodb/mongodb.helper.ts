// import moment from 'moment';
// import mongoose from 'mongoose';

import { ConnectionComponents, ConnectionOptions } from './interfaces';

class MongodbHelper {
  public getConnectionString(components: ConnectionComponents) {
    const username = components.username;
    const password = components.password;
    const replicaSet = components.replicaSet;
    const connectionOptions: ConnectionOptions = {};

    // connection options
    if (replicaSet && !components.isSRV) {
      connectionOptions.replicaSet = replicaSet;
    }
    if (components.isSSL) {
      connectionOptions.ssl = 'true';
    }
    if (components.retryWrites) {
      connectionOptions.retryWrites = 'true';
    }
    if (username && password) {
      connectionOptions.authSource = 'admin';
    }

    // uri
    let uri = '';
    if (replicaSet && !components.isSRV) {
      // if using old replicat set (multiple urls), append all with port
      uri = `${components.hosts[0]}:${components.port},
                              ${components.hosts[1]}:${components.port},
                              ${components.hosts[2]}:${components.port}`;
    } else if (components.isSRV) {
      // SRV connection string, ignore port
      uri = components.hosts[0];
    } else {
      // default URI with 1 host and port
      uri = `${components.hosts[0]}:${components.port}`;
    }

    // connection string
    let connectionString = 'mongodb';
    // is SRV connection string
    connectionString += components.isSRV ? '+srv' : '';
    connectionString += '://';
    // use auth
    connectionString += username && password ? `${username}:${password}@` : '';
    // URI and database name
    connectionString += `${uri}/${components.dbName}?`;
    // connection options
    connectionString += this.buildConnectionOptions(connectionOptions);

    console.info('connection string: %s', connectionString);
    return connectionString;
  }
  private buildConnectionOptions(option) {
    return Object.keys(option)
      .map((optionKey) => `${optionKey}=${option[optionKey]}`)
      .join('&');
  }
}

export default new MongodbHelper();
