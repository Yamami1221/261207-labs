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

  const recentEnrollments = await prisma.enrollment.findMany({
    include: {
      course: true,
      student: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return NextResponse.json({
    ok: true,
    recentEnrollments,
  });
};
