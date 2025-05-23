const config = {
  schema: 'schema/backend/schema.gql',
  documents: ['packages/graphql/src/**/*.graphql'],
  generates: {
    './packages/graphql/src/generated/index.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false
      }
    }
  }
};

module.exports = config;
