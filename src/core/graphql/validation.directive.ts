import { SchemaDirectiveVisitor } from 'apollo-server';
import {
  DirectiveLocation,
  GraphQLDirective,
  GraphQLScalarType,
  GraphQLString,
} from 'graphql';
import { Validator } from 'class-validator';

// init a validator instance
const validator = new Validator();
export const ConstraintDirectiveErrorName = 'ERR_GRAPHQL_CONSTRAINT_VALIDATION';

function validate(fieldName, args, value, type) {
  const { rule, params } = args;

  if (rule === 'isString' && typeof value === 'number') {
    value = String(value);
  }

  if (rule === 'isNumber' && typeof value === 'string') {
    try {
      value = parseInt(value, 10);
    } catch (error) {
      throw { code: ConstraintDirectiveErrorName, args, fieldName, value };
    }
  }

  const validateFunc = validator[rule];
  if (!value)
    throw { code: ConstraintDirectiveErrorName, args, fieldName, value };
  if (validateFunc) {
    if (validateFunc(value, params)) {
      return value;
    }
  }
  throw { code: ConstraintDirectiveErrorName, args, fieldName, value };
}

class ConstraintType extends GraphQLScalarType {
  constructor(fieldName, type, args) {
    super({
      name: 'Constraint',
      serialize(value) {
        return type.serialize(value);
      },
      parseValue(value) {
        value = type.serialize(value);

        validate(fieldName, args, value, type);

        return type.parseValue(value);
      },
      parseLiteral(ast) {
        const value = type.parseLiteral(ast);

        validate(fieldName, args, value, type);

        return value;
      },
    });
  }
}

// define customer validate directive for graphql input type
export class ConstraintDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName, schema) {
    return new GraphQLDirective({
      name: directiveName,
      locations: [DirectiveLocation.INPUT_FIELD_DEFINITION],
      args: {
        /* todo: 更好的做法是定一个类似:GraphQLObject 的类型
         *  error: {
         *    code: "xxxxx",
         *    payload: {
         *      key: "xxxxx"
         *    }
         *  }
         */
        rule: { type: GraphQLString },
        params: { type: GraphQLString },
        errorCode: {
          type: GraphQLString,
        },
        errorKeys: { type: GraphQLString },
      },
    });
  }

  visitInputFieldDefinition(field) {
    this.wrapType(field);
  }

  wrapType(field) {
    const fieldName = field.astNode.name.value;
    field.type = new ConstraintType(fieldName, field.type, this.args);
  }
}
