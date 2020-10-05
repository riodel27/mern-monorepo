import { Application, Response, NextFunction } from "express";
import { errors } from "celebrate";
import connectRedis from "connect-redis";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";

import config from "../config";
import routes from "../api";
import { COOKIE_NAME, __prod__ } from "../constants";

export default ({
  app,
  redis_client,
}: {
  app: Application;
  redis_client: any;
}) => {
  const RedisStore = connectRedis(session);

  app.enable("trust proxy");
  app.use(cors());
  app.use(bodyParser.json());

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis_client,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
        // domain: __prod__ ? ".xxx.com" : undefined,
      },
      saveUninitialized: false,
      secret: config.redis.secret,
      resave: false,
    })
  );

  // Load API routes
  app.use(config.api.prefix, routes());

  // handle joi validation errors
  app.use(errors());

  /// catch 404 and forward to error handler
  app.use((_, __, next) => {
    const err: any = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });

  /// error handlers
  app.use((err: any, _: any, res: Response, next: NextFunction) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });
  app.use((err: any, _: any, res: Response, __: any) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
