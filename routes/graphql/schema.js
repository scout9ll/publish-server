const { makeExecutableSchema } = require("graphql-tools");
const ProjectConfig = require("../../models/ProjectConfig");

const configModel = new ProjectConfig("total_config");
// Define schema in SDL
const typeDefs = `
    type Query {
      fullConfig(name: String!): FullConfig
    }
    type FullConfig {
      name:String!
      commonConfig: CommonConfig
      sjdConfig: SjdConfig
      appConfig: AppConfig
  
    }
    type CommonConfig {
        version: String!
    }
    type SjdConfig {
        version: String!
    }
    type AppConfig {
        version: String!
    }

    type Mutation {
      updateConfig (
        configData: FullConfigInput
      ): FullConfig
    }

    input FullConfigInput {
        name:String!
        commonConfig: CommonConfigInput
        sjdConfig: SjdConfigInput
        appConfig: AppConfigInput
    }

    input CommonConfigInput {
        version: String!
    }

    input SjdConfigInput {
        version: String!
    }

    input AppConfigInput {
        version: String!
    }
    `;

const resolvers = {
  Query: {
    fullConfig: async (root, args, context, info) => {
      console.log(`Resolver called: fullConfig`,args);
      const result = await configModel.getConfig(args);
      console.log(result)
      if (result[0]) return result[0];
    },
  },
  Mutation: {
    updateConfig: async (root, data, context, info) => {
      //   const _id = getObjectID(data._id);
      //   delete data._id;
      const name = data.name;
      const result = await configModel.patchConfig({ name }, data);
      console.log(result);
    },
  },
  // Resolvers for `User` are not needed here: graphql-js infers the returned values.
  // Remove the comments to see that they're called when the query contains the `id` and `name` fields.
  //   User: {
  //     id: (root, args, context, info) => {
  //       console.log(`Resolver called: user.id`)
  //       return root.id
  //     },
  //     name: (root, args, context, info) => {
  //       console.log(`Resolver called: user.name`)
  //       return root.name
  //     },
  //   },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
// Create and print SDL-representation of schema
// const sdlSchema = printSchema(schema)
// console.log(`Schema: \n${sdlSchema}`)

// Define the query
// const queryString = `
//     {
//       user(id: "abc") {
//         id
//         name
//       }
//     }`;
// const queryAST = parse(queryString);

// // Validate the query against the schema
// const errors = validate(schema, queryAST);
// if (errors.length === 0) {
//   console.log(`Validation successful`);
// } else {
//   console.log(`Errors: ${JSON.stringify(errors)}`);
// }

// // Execute the query against the schema
// execute(schema, queryAST)
//   .then((result) => {
//     console.log(`Execution result: \n${JSON.stringify(result)}`);
//   })
//   .catch((e) => console.log(JSON.stringify(e)));
