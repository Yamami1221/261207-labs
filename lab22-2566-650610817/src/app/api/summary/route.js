import { checkToken } from "@/libs/checkToken";
import { getPrisma } from "@/libs/getPrisma";
import { NextResponse } from "next/server";

export const GET = async () => {
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

  if (payload.role === "STUDENT") {
    return NextResponse.json(
      {
        ok: true,
        message: "Only Admin can access this API route",
      },
      { status: 403 }
    );
  }

  const prisma = getPrisma();
  const userCount = await prisma.user.count();
  const courseCount = await prisma.course.count();
  const studentCount = await prisma.student.count();
  const cpeCount = await prisma.student.count({
    where: { program: "CPE" },
  });
  const isneCount = await prisma.student.count({
    where: { program: "ISNE" },
  });

  const enrollmentCountByStudent = await prisma.student.findMany({
    select: {
      studentId: true,
      firstName: true,
      lastName: true,
      _count: {
        select: {
          enrollments: true,
        },
      },
    },
    orderBy: {
      studentId: "asc",
    },
  });

  return NextResponse.json({
    ok: true,
    userCount,
    courseCount,
    studentCount,
    cpeCount,
    isneCount,
    enrollmentCountByStudent,
  });
};
