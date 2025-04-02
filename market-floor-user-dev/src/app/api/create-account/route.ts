import { apiURL } from "@/constanst";
import { NextRequest, NextResponse } from "next/server";

//@ts-ignore
export async function POST(request: NextRequest) {
  const { firstName, lastName, email, password, username, role, phoneNumber } =
    await request.json();
  return await fetch(`${apiURL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      username,
      role,
      phoneNumber,
    }),
  });
}
