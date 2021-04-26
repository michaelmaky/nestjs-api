// import { Connection } from 'mongoose';
import GraphQLJSON from 'graphql-type-json';
import { GqlModuleOptions } from '@nestjs/graphql';

import { ConstraintDirective, ErrorTrackingExtension } from 'src/core/graphql';

export const GraphQLModuleFactory = async (): Promise<GqlModuleOptions> => {
  return {
    cors: true,
    typePaths: [`./**/*.gql`],
    // typePaths: [`${__dirname}/../../**/*.gql`],
    debug: process.env.NODE_ENV !== 'production',
    playground: process.env.NODE_ENV !== 'production',
    extensions: [() => new ErrorTrackingExtension()],
    schemaDirectives: {
      constraint: ConstraintDirective,
    },
    resolvers: {
      JSON: GraphQLJSON,
    },
  };
};
