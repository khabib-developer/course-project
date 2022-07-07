import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { User } from "../database/User";
import { UserDto } from "../dto";
import ApiError from "../exception/api-errors";
import { IUser } from "../interfaces";
import tokenService from "../services/token-service";
import userService from "../services/user-service";

class Auth {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      this.validation(req, next);
      await this.responseUserData(
        res,
        await userService.registration(req.body)
      );
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      this.validation(req, next);
      await this.responseUserData(res, await userService.login(req.body));
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      this.responseUserData(
        res,
        await userService.refresh(req.cookies.refreshToken)
      );
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await userService.update(req.body));
    } catch (error) {
      next(error);
    }
  }

  async validation(req: Request, next: NextFunction) {
    if (!validationResult(req).isEmpty()) {
      return next(
        ApiError.BadRequest(
          validationResult(req).array({ onlyFirstError: true })[0].msg
        )
      );
    }
  }

  async responseUserData(res: Response, user: User) {
    const { userData, accessToken, refreshToken } = tokenService.generateToken({
      ...new UserDto(user),
    });
    await tokenService.saveToken(user.id, refreshToken);
    console.log(refreshToken);
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.json({ user: userData, accessToken });
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await tokenService.removeToken(refreshToken);
      res.clearCookie("refreshToken");
      res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async check(req: any, res: Response, next: NextFunction) {
    try {
      res.json(await userService.checkUser(req.user.id));
    } catch (error) {
      next(error);
    }
  }
}

export default new Auth();
