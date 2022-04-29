import { query, ValidationChain } from "express-validator";

export const getOneByIdValidationChain: ValidationChain[] = [
  query("_id")
    .isHexadecimal()
    .withMessage("L'id doit être en hexadécimal")
    .isLength({ min: 24, max: 24 })
    .withMessage("L'id doit faire 24 caractères"),
];
