import { DB } from "@/app/libs/DB";
import {
  zStudentGetParam,
  zStudentPostBody,
  zStudentPutBody,
  zStudentDeleteBody,
} from "@/app/libs/schema";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const program = request.nextUrl.searchParams.get("program");
  const studentId = request.nextUrl.searchParams.get("studentId");

  //validate query parameters (if provided)
  const parseResult = zStudentGetParam.safeParse({
    program,
    studentId,
  });
  if (parseResult.success === false) {
    return NextResponse.json(
      {
        ok: false,
        message: parseResult.error.issues[0].message,
      },
      { status: 400 }
    );
  }

  let filtered = DB.students;
  if (program !== null) {
    filtered = filtered.filter((std) => std.program === program);
  }

  if (studentId !== null) {
    filtered = filtered.filter((std) => std.studentId === studentId);
  }
  return NextResponse.json({ ok: true, students: filtered });
};

export const POST = async (request) => {
  const body = await request.json();

  const parseResult = zStudentPostBody.safeParse(body);
  if (parseResult.success === false) {
    return NextResponse.json(
      {
        ok: false,
        message: parseResult.error.issues[0].message,
      },
      { status: 400 }
    );
  }

  //check duplicate student id
  const foundDupe = DB.students.find((std) => std.studentId === body.studentId);
  if (foundDupe) {
    return NextResponse.json(
      { ok: false, message: "Student Id already exists" },
      { status: 400 }
    );
  }

  DB.students.push(body);
  return NextResponse.json({
    ok: true,
    mesage: `Student Id ${body.studentId} has been added`,
  });
};

export const PUT = async (request) => {
  const body = await request.json();

  const parseResult = zStudentPutBody.safeParse(body);
  if (parseResult.success === false) {
    return NextResponse.json(
      {
        ok: false,
        message: parseResult.error.issues[0].message,
      },
      { status: 400 }
    );
  }

  const foundIndex = DB.students.findIndex(
    (std) => std.studentId === body.studentId
  );
  if (foundIndex === -1) {
    return NextResponse.json(
      {
        ok: false,
        message: "Student ID does not exist",
      },
      { status: 404 }
    );
  }

  DB.students[foundIndex] = { ...DB.students[foundIndex], ...body };
  return NextResponse.json({ ok: true, student: DB.students[foundIndex] });
};

export const DELETE = async (request) => {
  const body = await request.json();
  const parseResult = zStudentDeleteBody.safeParse(body);
  if (parseResult.success === false) {
    return NextResponse.json(
      {
        ok: false,
        message: parseResult.error.issues[0].message,
      },
      { status: 400 }
    );
  }

  const foundIndex = DB.students.findIndex(
    (std) => std.studentId === body.studentId
  );
  if (foundIndex === -1) {
    return NextResponse.json(
      {
        ok: false,
        message: "Student ID does not exist",
      },
      { status: 404 }
    );
  }

  DB.students = DB.students.filter((std) => std.studentId !== body.studentId);
  return NextResponse.json({
    ok: true,
    message: `Student Id ${body.studentId} has been deleted`,
  });
};
