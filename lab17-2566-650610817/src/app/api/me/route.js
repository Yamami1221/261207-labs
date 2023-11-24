import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Anak Sarntinoranont",
    studentId: "650610817",
  });
};
