import jwt from "jsonwebtoken";
import { env } from "../../config/envVars.js";

export default class TokenService {
  static async createToken(payload: Record<string, any>) {
    const token = jwt.sign(payload, env.JWT_SECRET_TOKEN);
    return token;
  };

  static async validateToken(token: string) {
    const payload = jwt.verify(token, env.JWT_SECRET_TOKEN)
    return payload
  };
}