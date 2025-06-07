import { apiURL } from "@/constanst";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const { id, firstName, lastName, email, phoneNumber, username } = await request.json();
    const accessToken = request.headers.get("Authorization")?.split(" ")[1];

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const response = await fetch(`${apiURL}/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phoneNumber,
        username,
      }),
    });

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update profile" },
      { status: 500 }
    );
  }
} 