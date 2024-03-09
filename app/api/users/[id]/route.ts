import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import User from "@/app/models/userModels";
import { NextRequest, NextResponse } from "next/server";

// Get user by id
export async function GET(request: NextRequest, { params }: any) {
  try {
    const tokenData = await getDataFromToken(request);
    if (tokenData.isVerfied) {
      const { id } = params;
      const user = await User.findOne({ _id: id });

      if (!user) {
        return NextResponse.json({ error: "user not found" }, { status: 404 });
      }
      user.password = "";
      user.verifyTokenExpiry = "";
      user.verifyToken = "";
      return NextResponse.json({
        user,
      });
    } else {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
