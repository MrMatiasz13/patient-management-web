import { Router } from "express";
import {
  createScreeningTest,
  getAllScreeningTestsForPatient,
  getScreeningTestById,
} from "../controllers/screeningTestController";
import verifyToken from "../middleware/auth";

const testRouter = Router();

testRouter
  .route("/api/:patientId/screening-tests")
  .get(verifyToken, getAllScreeningTestsForPatient);
testRouter
  .route("/api/screening-test/:id")
  .get(verifyToken, getScreeningTestById);
testRouter
  .route("/api/screening-test/create")
  .post(verifyToken, createScreeningTest);

export default testRouter;
