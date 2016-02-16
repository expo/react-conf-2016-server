import Koa from 'koa';
import koaRouter from 'koa-router';
import convert from 'koa-convert';
import mount from 'koa-mount';
import graphqlHTTP from 'koa-graphql';

import Schema from 'Schema';
import DataLoaders from 'DataLoaders';

import { graphql } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';

const app = new Koa();
const router = koaRouter();

router.all('/graphql', convert(graphqlHTTP((ctx, req) => ({
  schema: Schema,
  rootValue: {
    session: ctx.session,
    loaders: DataLoaders.create(ctx),
  },
  graphiql: true,
}))));

router.get('/schema.json', async (ctx, next) => {
  const result = await graphql(Schema, introspectionQuery);
  ctx.body = JSON.stringify(result, null, 2);
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => console.log(
  `GraphQL Server is now running on http://localhost:3000/`
));
