import asyncHandler from "express-async-handler"

const login = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Login still working XD" });
});

const register = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Register still working XD" });
});

export { login, register };