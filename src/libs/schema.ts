import { z } from "zod";

const zStudentId = z
  .string({ required_error: "Student Id must contain 9 characters" })
  .length(9, { message: "Student Id must contain 9 characters" });
const zFirstName = z
  .string({ required_error: "First name requires at least 3 charaters" })
  .min(3, { message: "First name requires at least 3 charaters" });
const zLastName = z
  .string({ required_error: "Last name requires at least 3 characters" })
  .min(3, { message: "Last name requires at least 3 characters" });
const zProgram = z.enum(["CPE", "ISNE"], {
  errorMap: () => ({
    message: "Program must be either CPE or ISNE",
  }),
});
const zCourseNo = z
  .string({ required_error: "Course No must contain 6 characters" })
  .length(6, { message: "Course No must contain 6 characters" });

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

export const zEnrollmentGetParam = z.object({
  studentId: zStudentId.nullish(),
  courseNo: zCourseNo.nullish(),
});

export const zEnrollmentPostBody = z.object({
  studentId: zStudentId,
  courseNo: zCourseNo,
});

export const zEnrollmentDeleteBody = zEnrollmentPostBody;
