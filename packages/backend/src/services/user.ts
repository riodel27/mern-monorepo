import { Service, Inject } from "typedi";
import argon2 from "argon2";
import { Model, Document } from "mongoose";
import { randomBytes } from "crypto";
import { not } from "ramda";
import mongodb from "mongodb";

import { IUser, IUserInputDTO as IUserInput } from "../interfaces/IUser";

@Service()
export default class UserService {
  constructor(
    @Inject("userModel") private user: Model<IUser & Document, {}>,
    @Inject("logger") private logger: any
  ) {}

  public async FindOneUser(query: { _id: string }): Promise<IUser | null> {
    try {
      const user = await this.user.findOne(query);

      if (not(user)) throw new Error("user not found");

      return user;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async UpdateUser(
    id: string,
    userInput: IUserInput
  ): Promise<IUser | null> {
    try {
      if (userInput.email) {
        const existingUserEmail = await this.user.findOne({
          email: userInput.email,
        });

        if (existingUserEmail && existingUserEmail.id !== id)
          throw new Error("User with this email already exists");
      }

      const salt = randomBytes(32);

      const hashPassword =
        userInput.password &&
        userInput.password.trim() &&
        (await argon2.hash(userInput.password, { salt }));

      const user = await this.user.findOneAndUpdate(
        { _id: id },
        {
          ...userInput,
          ...(hashPassword && {
            salt: salt.toString("hex"),
            password: hashPassword,
          }),
        },
        { new: true }
      );

      //TODO: custom error
      if (not(user)) throw new Error("Unknown user");

      return user;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async DeleteOneUser(filter: {
    _id: string;
  }): Promise<
    mongodb.DeleteWriteOpResultObject["result"] & { deletedCount?: number }
  > {
    const response = await this.user.deleteOne(filter);
    return response;
  }
}
