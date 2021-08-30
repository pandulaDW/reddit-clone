import { Request, Response } from "express";
import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";

export interface MyContext {
  em: EntityManager<IDatabaseDriver<Connection>>;
  req: Request;
  res: Response;
}
