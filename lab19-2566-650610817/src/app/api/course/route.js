import { DB, readDB } from "@/libs/DB";
import { NextResponse } from "next/server";
import sleep from "sleep-promise";

export const GET = async () => {
  await sleep(1000);
  readDB();
  return NextResponse.json({ ok: true, courses: DB.courses });
};
