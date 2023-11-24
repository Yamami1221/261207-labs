import { DB } from "@/app/libs/DB";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const rawAuthHeader = headers().get("authorization");
  const token = rawAuthHeader.split(" ")[1];

  let studentId = null;

  //preparing "role" variable for reading role information from token
  let role = null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    studentId = payload.studentId;

    //read role information from "payload" here (just one line code!)
    role = payload.role;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }

  //Check role here. If user is "ADMIN" show all of the enrollments instead
  if (role === "ADMIN") {
    return NextResponse.json({
      ok: true,
      enrollments: DB.enrollments,
    });
  }

  const courseNoList = [];
  for (const enroll of DB.enrollments) {
    if (enroll.studentId === studentId) {
      courseNoList.push(enroll.courseNo);
    }
  }
  return NextResponse.json({
    ok: true,
    courseNoList,
  });
};

export const POST = async (request) => {
  //verify token
  const rawAuthHeader = headers().get("authorization");
  const token = rawAuthHeader.split(" ")[1];
  let studentId = null;
  //preparing "role" variable for reading role information from token
  let role = null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    studentId = payload.studentId;
    //read role information from "payload" here (just one line code!)
    role = payload.role;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }

  //if role is "ADMIN", send the following response
  if (role === "ADMIN") {
    return NextResponse.json(
      {
        ok: true,
        message: "Only Student can access this API route",
      },
      { status: 403 }
    );
  }

  //read body request
  const body = await request.json();
  const { courseNo } = body;
  if (typeof courseNo !== "string" || courseNo.length !== 6) {
    return NextResponse.json(
      {
        ok: false,
        message: "courseNo must contain 6 characters",
      },
      { status: 400 }
    );
  }

  const foundCourse = DB.courses.find((x) => x.courseNo === courseNo);
  if (!foundCourse) {
    return NextResponse.json(
      {
        ok: false,
        message: "courseNo does not exist",
      },
      { status: 400 }
    );
  }

  const foundEnroll = DB.enrollments.find(
    (x) => x.studentId === studentId && x.courseNo === courseNo
  );
  if (foundEnroll) {
    return NextResponse.json(
      {
        ok: false,
        message: "You already enrolled that course",
      },
      { status: 400 }
    );
  }

  DB.enrollments.push({
    studentId,
    courseNo,
  });

  return NextResponse.json({
    ok: true,
    message: "You has enrolled a course successfully",
  });
};

export const DELETE = async (request) => {
  //check token
  const rawAuthHeader = headers().get("authorization");
  const token = rawAuthHeader.split(" ")[1];
  //verify token and get "studentId" and "role" information here
  let studentId = null;
  let role = null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    studentId = payload.studentId;
    role = payload.role;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }

  //if role is "ADMIN", send the following response
  if (role === "ADMIN") {
    return NextResponse.json(
      {
        ok: true,
        message: "Only Student can access this API route",
      },
      { status: 403 }
    );
  }

  //get courseNo from body and validate it
  const body = await request.json();
  const { courseNo } = body;
  if (typeof courseNo !== "string" || courseNo.length !== 6) {
    return NextResponse.json(
      {
        ok: false,
        message: "courseNo must contain 6 characters",
      },
      { status: 400 }
    );
  }

  const foundIndex = DB.enrollments.findIndex(
    (x) => x.studentId === studentId && x.courseNo === courseNo
  );
  if (foundIndex === -1) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "You cannot drop from this course. You have not enrolled it yet!",
      },
      { status: 404 }
    );
  }

  DB.enrollments.splice(foundIndex, 1);

  return NextResponse.json({
    ok: true,
    message: "You has dropped from this course. See you next semester.",
  });
};
