import { DB, originalDB } from "@/app/libs/DB";
import _ from "lodash";
import { NextResponse } from "next/server";

//this route is for grading only
//in case of DB is messed up.

export const POST = () => {
  DB.courses = _.cloneDeep(originalDB.courses);
  DB.enrollments = _.cloneDeep(originalDB.enrollments);
  DB.students = _.cloneDeep(originalDB.students);
  return NextResponse.json({ ok: true, message: "DB has been reset" });
};
