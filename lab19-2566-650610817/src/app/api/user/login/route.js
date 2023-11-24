import jwt from "jsonwebtoken";

//POST /api/user/login

import { DB, readDB } from "@/libs/DB";
import { NextResponse } from "next/server";
import sleep from "sleep-promise";

export const POST = async (request) => {
  const body = await request.json();
  const { username, password } = body;

  //you should do the validation here
  readDB();
  const user = DB.users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return NextResponse.json(
      {
        ok: false,
        message: "Username or password is incorrect",
      },
      { status: 400 }
    );
  }

  //if found user, sign a JWT TOKEN
  const token = jwt.sign(
    { username, role: user.role, studentId: user.studentId },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  await sleep(1000);

  return NextResponse.json({ ok: true, token, username });
};
