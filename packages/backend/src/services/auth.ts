import argon2 from "argon2";
import { Service, Inject } from "typedi";
import jwt from "jsonwebtoken";
import { not } from "ramda";
import { Model, Document } from "mongoose";
import { randomBytes } from "crypto";

import { IUser, IUserInputDTO } from "../interfaces/IUser";
import config from "../config";

@Service()
export default class AuthService {
  constructor(
    @Inject("userModel") private user: Model<IUser & Document, {}>,
    @Inject("logger") private logger: any
  ) {}

  public async SignUp(
    userInputDTO: IUserInputDTO
  ): Promise<{ user: IUser; token: string }> {
    try {
      const salt = randomBytes(32);

      const userInput = {
        ...userInputDTO,
        salt: salt.toString("hex"),
        password: await argon2.hash(userInputDTO.password, { salt }),
      };

      const userRecord = await this.user.create(userInput);

      const token = this.generateToken(userRecord);

      if (not(userRecord)) {
        throw new Error("User cannot be created");
      }

      /**
       * @TODO This is not the best way to deal with this
       * There should exist a 'Mapper' layer
       * that transforms data from layer to layer
       * but that's too over-engineering for now
       */
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, "password");
      Reflect.deleteProperty(user, "salt");
      return { user, token };
    } catch (e) {
      /**
       * @TODO: how to handle database error like duplicate key. ex. email uniqueness
       */
      this.logger.error(e);
      throw e;
    }
  }

  public async SignIn(
    email: string,
    password: string
  ): Promise<{ user: IUser; token: string }> {
    const userRecord = await this.user.findOne({ email });

    if (not(userRecord)) {
      throw new Error("Incorrect email or password");
    }

    const validPassword = await argon2.verify(userRecord!.password, password);

    if (not(validPassword)) throw new Error("Incorrect email or password");

    const token = this.generateToken(userRecord);

    const user = userRecord?.toObject();
    Reflect.deleteProperty(user, "password");
    Reflect.deleteProperty(user, "salt");

    return { user, token };
  }

  private generateToken(user: any) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        _id: user._id, // We are gonna use this in the middleware 'isAuth'
        role: user.role,
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret
    );
  }
}
