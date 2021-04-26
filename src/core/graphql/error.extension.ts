import { GraphQLExtension } from 'graphql-extensions';
export class ErrorTrackingExtension extends GraphQLExtension {
  willSendResponse(o) {
    const { graphqlResponse } = o;
    if (graphqlResponse.errors && graphqlResponse.errors.length) {
      graphqlResponse.errors = [graphqlResponse.errors[0]];
    }
    return o;
  }
}
