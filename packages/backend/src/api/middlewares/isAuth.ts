import { Request } from "express";
import jwt from "express-jwt";
import config from "../../config";

/**
 * We are assuming that the JWT will come in a header with the form
 *
 * Authorization: Bearer ${JWT}
 *
 */
const getTokenFromHeader = (req: Request) => {
  /**
   * Edge and Internet Explorer do some weird things with the headers
   * So I believe that this should handle more 'edge' cases ;)
   */
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const isAuth = jwt({
  secret: config.jwtSecret, // The _secret_ to sign the JWTs
  userProperty: "token", // Use req.token to store the JWT
  algorithms: ["HS256"],
  getToken: getTokenFromHeader, // How to extract the JWT from the request
});

export default isAuth;
