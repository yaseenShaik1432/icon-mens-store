import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/app/models/userModels";
import { connect } from "@/app/database/dbConfig";

connect();

// Login
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    //create token data
    const tokenData = {
      id: user._id,
      name: `${user.firstname} ${user.lastname}`,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerfied: user.isVerfied,
      phonenumber: user.phonenumber,
    };
    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      userId: user._id,
      token,
    });
    response.cookies.set("token", token);
    // response.cookies.set("isAdmin", user.isAdmin, {
    //   secure: true,
    //   httpOnly: true,
    //   sameSite: "none",
    // });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
