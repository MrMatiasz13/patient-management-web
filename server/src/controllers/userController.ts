import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { userService } from "../di";
import { UserDto } from "../dtos/userDto";

const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, surename, email, password } = req.body;

    if (!name || !surename || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const userData: UserDto = {
      name: name,
      surename: surename,
      email: email,
      password: password,
    };

    const newUser = await userService.createUser(userData);
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  }
);

export default createUser;
