import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const toki = request.cookies.get("token");
    if (toki) {
      const response = NextResponse.json({
        message: "Logout successful",
        success: true,
      });
      response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      // response.cookies.set("isAdmin", "", {
      //   httpOnly: true,
      //   expires: new Date(0),
      // });
      return response;
    } else {
      return NextResponse.json(
        { error: "User is already logged out" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
