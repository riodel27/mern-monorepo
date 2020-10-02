import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";

import AuthService from "../../services/auth";
import UserService from "../../services/user";

export default {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    const logger: any = Container.get("logger");
    logger.debug("calling create user endpoint with body: ", req.body);

    try {
      const authServiceInstance = Container.get(AuthService);

      const { user, token } = await authServiceInstance.SignUp(req.body);

      logger.info(`${req.method} ${req.originalUrl} ${201}`);

      return res.status(201).json({
        message: "User Created",
        data: { user, token },
      });
    } catch (error) {
      return next(error);
    }
  },
  getUserById: async (req: Request, res: Response, next: NextFunction) => {
    const logger: any = Container.get("logger");
    logger.debug("calling get user  by id endpoint");

    try {
      const { id } = req.params;

      const userServiceInstance = Container.get(UserService);

      const user = await userServiceInstance.FindOneUser({ _id: id });

      logger.info(`${req.method} ${req.originalUrl} ${200}`);
      return res.status(200).json({ message: "Ok", data: user });
    } catch (error) {
      return next(error);
    }
  },
  list: async (req: Request, res: Response, next: NextFunction) => {
    const logger: any = Container.get("logger");
    logger.debug(`calling get users endpoint`);
    try {
      const UserModel: any = Container.get("userModel");

      const users = await UserModel.find();

      logger.info(`${req.method} ${req.originalUrl} ${202}`);
      return res.status(202).json({ message: "users", data: users });
    } catch (error) {
      return next(error);
    }
  },
  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    const logger: any = Container.get("logger");
    logger.debug(`calling update user endpoint`);
    try {
      const { id } = req.params;
      const { body: userInput } = req;

      const userServiceInstance = Container.get(UserService);

      const user = await userServiceInstance.UpdateUser(id, userInput);

      logger.info(`${req.method} ${req.originalUrl} ${202}`);
      return res.status(202).json({ message: "User Updated", data: user });
    } catch (error) {
      return next(error);
    }
  },
  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    const logger: any = Container.get("logger");
    logger.debug(`calling delete user endpoint`);
    try {
      const { id } = req.params;

      const userServiceInstance = Container.get(UserService);

      await userServiceInstance.DeleteOneUser({ _id: id });

      logger.info(`${req.method} ${req.originalUrl} ${202}`);
      return res.status(202).json({ message: "delete successful" });
    } catch (error) {
      return next(error);
    }
  },
};
