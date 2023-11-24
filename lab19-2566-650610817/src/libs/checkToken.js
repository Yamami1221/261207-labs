//if token is valid, return payload
//otherwise, return null
import jwt from "jsonwebtoken";
import { headers } from "next/headers";

export function checkToken() {
  const headersData = headers();
  if (!headersData) return null;
  const rawAuthHeader = headersData.get("authorization");
  if (!rawAuthHeader) return null;
  const token = rawAuthHeader.split(" ")[1];

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}
