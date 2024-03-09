import User from "@/app/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/app/database/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, token, confirmPassword } = reqBody;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    if (confirmPassword === password) {
      user.password = hashedPassword;
      user.forgotPasswordToken = undefined;
      user.forgotPasswordTokenExpiry = undefined;
      await user.save();
      return NextResponse.json({
        message: "Email reset successfully",
        success: true,
      });
    } else {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
