import { RequestHandler } from "express";
import { IUserSignUpBody } from "../interfaces/user";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

export const signUp: RequestHandler<
  unknown,
  unknown,
  IUserSignUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;
  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "Missing credentials");
    }
    const existingUsername = await UserModel.findOne({ username }).exec();
    const existingEmail = await UserModel.findOne({ email }).exec();
    if (existingUsername || existingEmail) {
      throw createHttpError(409, "Username or email already in use");
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);
    
    const user = await UserModel.create({
        username,
        email,
        password: passwordHashed,
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
