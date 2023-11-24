import { getPrisma } from "@/libs/getPrisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const prisma = getPrisma();
  const courses = await prisma.course.findMany({
    orderBy: {
      courseNo: "asc",
    },
  });

  return NextResponse.json({ ok: true, courses: courses });
};
