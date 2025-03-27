import { Router } from "express";
import veryfiToken from "../middleware/auth";

const protectedRouter = Router();

protectedRouter.route('/api/protected').get(veryfiToken, (req, res) => {
    res.status(200).json({ message: "Jest tokenik to jest zajebiscie!!!" });
});

export default protectedRouter;