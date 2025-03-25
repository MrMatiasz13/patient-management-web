import { NextFunction, Request, Response } from "express"
import asyncHandler from "express-async-handler"


const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

});

export default login;