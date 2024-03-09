import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/userModels";
import { sendEmail } from "@/app/helpers/mailer";
import { connect } from "@/app/database/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    if (email === "") {
      return NextResponse.json(
        { error: "please enter email" },
        { status: 400 }
      );
    }

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    await sendEmail({ email, emailType: "RESET", userId: user._id });

    const response = NextResponse.json({
      message: "reset link sent to email",
      success: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
