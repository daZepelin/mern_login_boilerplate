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

    req.session.userId = user._id;

    res
      .status(201)
      .json({ email: user.email, username: user.username, _id: user._id });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler<
  unknown,
  unknown,
  IUserSignUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const passwordRaw = req.body.password;
  try {
    if (!username || !passwordRaw) {
      throw createHttpError(400, "Missing credentials");
    }

    const user = await UserModel.findOne({ username })
      .select("+password")
      .exec();
    if (!user) {
      throw createHttpError(401, "Wrong credentials");
    }

    const isPasswordValid = await bcrypt.compare(passwordRaw, user.password);
    if (!isPasswordValid) {
      throw createHttpError(401, "Wrong credentials");
    }

    req.session.userId = user._id;

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        next(err);
        return;
      }
      res.clearCookie("sid");
      res.status(200).json({ message: "Logged out" });
    });
  } catch (error) {
    next(error);
  }
};

export const getAuthUser: RequestHandler = async (req, res, next) => {
  const authUserId = req.session.userId;

  try {
    if (!authUserId) {
      throw createHttpError(401, "Not authenticated");
    }

    const user = await UserModel.findById(authUserId).exec();
    if (!user) {
      throw createHttpError(401, "Not authenticated");
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
