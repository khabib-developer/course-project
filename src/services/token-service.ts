import { IUser } from "../interfaces";
import { env } from "process";

import * as jwt from "jsonwebtoken";
import { Token } from "../database/Token";

class TokenService {
  generateToken(payload: IUser): {
    userData: IUser;
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = jwt.sign(payload, env.jwtSecretAccess!, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(
      { id: payload.id, name: payload.name },
      env.jwtSecretRefresh!,
      {
        expiresIn: "1d",
      }
    );
    return { userData: payload, accessToken, refreshToken };
  }

  validateAccessToken(token: string): IUser | null {
    try {
      return jwt.verify(token, env.jwtSecretAccess!) as IUser;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token: string): IUser | null {
    try {
      return jwt.verify(token, env.jwtSecretRefresh!) as IUser;
    } catch (error) {
      return null;
    }
  }

  async saveToken(UserId: number, refreshToken: string): Promise<Token> {
    const token = await Token.findOne({ where: { UserId } });
    if (token) {
      token.refreshToken = refreshToken;
      await token.save();
      return token;
    }

    return await Token.create({ UserId, refreshToken });
  }

  async removeToken(refreshToken: string): Promise<Token | null> {
    const token = await Token.findOne({ where: { refreshToken } });
    if (token) {
      await token.destroy();
      return token;
    }
    return null;
  }

  async findToken(refreshToken: string): Promise<Token | null> {
    return await Token.findOne({ where: { refreshToken } });
  }
}

export default new TokenService();
