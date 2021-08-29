import argon from "argon2";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { MyContext } from "../types";
import { User } from "../entities/User";

@InputType()
class UserNamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(@Ctx() { em }: MyContext): Promise<User[]> {
    return await em.find(User, {});
  }

  @Mutation(() => String)
  async register(
    @Arg("options") options: UserNamePasswordInput,
    @Ctx() { em }: MyContext
  ) {
    const hashedPassword = await argon.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });
    await em.persistAndFlush(user);
    return "bye";
  }
}
