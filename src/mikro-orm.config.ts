import path from "path";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { __prod__ } from "./constants";
import { Options, Connection, IDatabaseDriver } from "@mikro-orm/core";

const config: Options<IDatabaseDriver<Connection>> = {
  type: "postgresql",
  dbName: "lireddit",
  entities: [Post, User],
  user: "postgres",
  password: "gotohell2",
  debug: !__prod__,
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
};

export default config;
