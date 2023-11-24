import { DB } from "@/app/libs/DB";
import { NextResponse } from "next/server";

//this route is use for debugging
//to see what's really inside DB

export const GET = async () => {
  return NextResponse.json({ ok: true, DB });
};
