import koa from 'koa';
import mount from 'koa-mount';
import graphqlHTTP from 'koa-graphql';

import Schema from 'Schema';
import DataLoaders from 'DataLoaders';

const app = koa();

app.use(
  mount(
    '/graphql',
    graphqlHTTP((request, context) => ({
      schema: Schema,
      rootValue: {
        session: context.session,
        loaders: DataLoaders.create(context),
      },
      graphiql: true,
    }))
  )
);

app.listen(3000, () => console.log(
  `GraphQL Server is now running on http://localhost:3000/`
));
