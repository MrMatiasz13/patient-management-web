import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { screeningTestService } from "../di";
import { ScreeningTestDto } from "../dtos/screeningTestDto";

const getAllScreeningTestsForPatient = asyncHandler(
  async (req: Request, res: Response) => {
    const patientId = Number(req.params.patientId);

    const screeningTests =
      await screeningTestService.getAllScreeningTestsByPatientId(patientId);

    res.status(200).json({ screeningTests });
  }
);

const getScreeningTestById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const screeningTest = await screeningTestService.getScreeningTestById(id);
    if (!screeningTest) {
      res.status(404).json({ message: "Screening test not found." });
      return;
    }

    res.status(200).json(screeningTest);
  }
);

const createScreeningTest = asyncHandler(
  async (req: Request, res: Response) => {
    const data: ScreeningTestDto = req.body;

    if (!data.patientId || !data.date || !data.formState) {
      res.status(400).json({ message: "Test data is missing or incomplete." });
      return;
    }

    const createdTest = await screeningTestService.createScreeningTest(data);
    res.status(201).json({
      message: "Successfully created screening test.",
      test: createdTest,
    });
  }
);

const deleteScreningTest = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    res.status(400).json({ message: "Screening test id i missing" });
    return;
  }

  await screeningTestService.deleteScreeningTestById(Number(id));
  res.status(201).json({
    message: "Successfully deleted screening test.",
  });
});

export {
  getAllScreeningTestsForPatient,
  getScreeningTestById,
  createScreeningTest,
  deleteScreningTest,
};
