import { Post } from "./entities/Post";
import { __prod__ } from "./constants";
import { Options, Connection, IDatabaseDriver } from "@mikro-orm/core";

const config: Options<IDatabaseDriver<Connection>> = {
  type: "postgresql",
  dbName: "lireddit",
  entities: [Post],
  user: "postgres",
  password: "gotohell2",
  debug: !__prod__,
};

export default config;
