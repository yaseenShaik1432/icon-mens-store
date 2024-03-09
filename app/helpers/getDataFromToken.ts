import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token =
      request.headers.get("Authorization")?.replace("Bearer ", "") || "";
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
