import { MikroORM } from "@mikro-orm/core";
import dbConfig from "./mikro-orm.config";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";

const main = async () => {
  const orm = await MikroORM.init(dbConfig);
  await orm.getMigrator().up();
  const post = orm.em.create(Post, { title: "my first post" });
  await orm.em.persistAndFlush(post);
};

main().catch((err) => console.error(err.message));
