import { z } from "zod";

const zStudentId = z
  .string()
  .length(9, { message: "Student Id must contain 9 characters" });
const zFirstName = z
  .string()
  .min(3, { message: "First name requires at least 3 charaters" });
const zLastName = z
  .string()
  .min(3, { message: "Last name requires at least 3 characters" });
const zProgram = z.enum(["CPE", "ISNE"], {
  errorMap: () => ({
    message: "Program must be either CPE or ISNE",
  }),
});

export const zStudentPostBody = z.object({
  studentId: zStudentId,
  firstName: zFirstName,
  lastName: zLastName,
  program: zProgram,
});

export const zStudentPutBody = z.object({
  studentId: zStudentId,
  firstName: zFirstName.nullish(),
  lastName: zLastName.nullish(),
  program: zProgram.nullish(),
});

export const zStudentGetParam = z.object({
  studentId: zStudentId.nullish(),
  program: zProgram.nullish(),
});

export const zStudentDeleteBody = z.object({
  studentId: zStudentId,
});
