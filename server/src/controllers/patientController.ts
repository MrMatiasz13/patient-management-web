import { NextFunction, Request, Response } from "express";
import { patientService } from "../services";
import asyncHandler from "express-async-handler"; 
import PatientDto from "../dtos/patientDto";

const createPatient = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const dto: PatientDto = req.body;
    if (!dto || !dto.name || !dto.surename) {
        res.status(400).json({ message: "Patient data is missing or incomplete." });
        return;
    }

    const patient = await patientService.createPatient(dto);

    res.status(201).json({ message: "Successfully created patient.", patient: patient });
});

export default createPatient;