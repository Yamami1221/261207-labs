import { checkToken } from "@/libs/checkToken";
import { getPrisma } from "@/libs/getPrisma";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const payload = checkToken();
  if (!payload) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }
  const { role, studentId } = payload;

  if (role === "ADMIN") {
    return NextResponse.json(
      {
        ok: true,
        message: "Only Student can access this API route",
      },
      { status: 403 }
    );
  }

  const prisma = getPrisma();
  const enrollments = await prisma.enrollment.findMany({
    where: {
      studentId,
    },
    include: {
      course: true,
    },
    orderBy: {
      courseNo: "asc",
    },
  });

  return NextResponse.json({
    ok: true,
    enrollments,
  });
};

export const POST = async (request) => {
  const payload = checkToken();
  if (!payload) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }
  const { role, studentId } = payload;

  if (role === "ADMIN") {
    return NextResponse.json(
      {
        ok: true,
        message: "Only Student can access this API route",
      },
      { status: 403 }
    );
  }

  //read body request & validate it
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

  const prisma = getPrisma();
  const course = await prisma.course.findFirst({
    where: {
      courseNo,
    },
  });

  if (!course) {
    return NextResponse.json(
      {
        ok: false,
        message: "Course number does not exist",
      },
      { status: 400 }
    );
  }

  try {
    await prisma.enrollment.create({
      data: {
        studentId,
        courseNo,
      },
    });
  } catch (error) {
    if (error.code === "P2002") {
      return NextResponse.json(
        {
          ok: false,
          message: "You already registered this course",
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        {
          ok: false,
          message: "Oops!, please try again later",
        },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({
    ok: true,
    message: "You has enrolled a course successfully",
  });
};

export const DELETE = async (request) => {
  const payload = checkToken();
  if (!payload) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }
  const { role, studentId } = payload;

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
  const { enrollmentId } = body;
  if (typeof enrollmentId !== "string") {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid enrollmentId",
      },
      { status: 400 }
    );
  }

  const prisma = getPrisma();

  try {
    await prisma.enrollment.delete({
      where: {
        id: enrollmentId,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "You cannot drop from this course. You have not enrolled it yet!",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "You has dropped from this course. See you next semester.",
  });
};
