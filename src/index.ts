import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { MikroORM } from "@mikro-orm/core";
import dbConfig from "./mikro-orm.config";

import { __prod__ } from "./constants";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  apolloServer.applyMiddleware({ app });

  const orm = await MikroORM.init(dbConfig);
  await orm.getMigrator().up();

  app.listen(4000, () => {
    console.log("server started on port 4000...");
  });
};

main().catch((err) => console.error(err.message));
