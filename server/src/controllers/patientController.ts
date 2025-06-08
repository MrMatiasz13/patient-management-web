import { NextFunction, Request, Response } from "express";
import { patientService } from "../di";
import asyncHandler from "express-async-handler";
import { PatientDto } from "../dtos/patientDto";

const getAllPatients = asyncHandler(async (req: Request, res: Response) => {
  const patients = await patientService.getAllPatients();

  res.status(200).json({ patients: patients });
});

const getPatient = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;

  const patient = await patientService.getPatientById(Number(id));
  if (!patient) {
    res.status(404).json({ message: "Patient not found" });
    return;
  }

  res.status(200).json(patient);
});

const createPatient = asyncHandler(async (req: Request, res: Response) => {
  const dto: PatientDto = req.body;
  if (!dto || !dto.name || !dto.surname) {
    res.status(400).json({ message: "Patient data is missing or incomplete." });
    return;
  }

  const patient = await patientService.createPatient(dto);

  res
    .status(201)
    .json({ message: "Successfully created patient.", patient: patient });
});

const deletePatient = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;

  const deletedPatient = await patientService.deletePatient(Number(id));
  if (!deletedPatient) {
    res.status(404).json({ message: "Patient not found" });
    return;
  }

  res.status(200).json({ message: `Succesfully deleted patient of id: ${id}` });
});

export { getAllPatients, getPatient, createPatient, deletePatient };
