import express from "express";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { MikroORM } from "@mikro-orm/core";
import dbConfig from "./mikro-orm.config";

import { __prod__ } from "./constants";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  const app = express();

  const RedisStore = connectRedis(session);

  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redis.createClient(),
        disableTTL: true,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        secure: __prod__,
        sameSite: "lax",
      },
      secret: "4006c0019cdb3d82c56ec377944edd68",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res }),
  });
  apolloServer.applyMiddleware({ app });

  const orm = await MikroORM.init(dbConfig);
  await orm.getMigrator().up();

  app.listen(4000, () => {
    console.log("server started on port 4000...");
  });
};

main().catch((err) => console.error(err.message));
