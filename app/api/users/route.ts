import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/app/models/userModels";
import { sendEmail } from "@/app/helpers/mailer";
import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import { connect } from "@/app/database/dbConfig";

connect();

// Get all users
export async function GET(request: NextRequest) {
  try {
    const tokenData = await getDataFromToken(request);
    if (tokenData.isVerfied) {
      const users = await User.find().sort({ _id: "desc" });
      if (!users) {
        return NextResponse.json(
          { error: "No Users not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        message: "Got Users details successfully",
        success: true,
        users,
      });
    } else {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create user
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { firstname, lastname, email, password, phonenumber } = reqBody;

    //check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
      phonenumber: phonenumber,
    });

    const savedUser = await newUser.save();

    //send verification email

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Edit user
export async function PUT(request: NextRequest) {
  try {
    const tokenData = await getDataFromToken(request);
    if (tokenData.isVerfied) {
      const reqBody = await request.json();
      const {
        firstname,
        lastname,
        email,
        oldpassword,
        newpassword,
        phonenumber,
      } = reqBody;

      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json(
          { error: "User does not exist" },
          { status: 404 }
        );
      }
      const validPassword = await bcryptjs.compare(oldpassword, user.password);
      if (!validPassword) {
        return NextResponse.json(
          {
            error: "enter valid old password",
          },
          { status: 400 }
        );
      } else {
        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newpassword, salt);
        const updatedProduct = await User.findOneAndUpdate(
          { email },
          {
            $set: {
              firstname,
              lastname,
              email,
              password: hashedPassword,
              phonenumber,
            },
          },
          { new: true }
        );

        return NextResponse.json({
          message: "User updated successfully",
          success: true,
          updatedProduct,
        });
      }
    } else {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete user
export async function DELETE(request: NextRequest) {
  try {
    const tokenData = await getDataFromToken(request);
    if (tokenData?.isVerfied) {
      const reqBody = await request.json();
      const { email } = reqBody;

      const deletedUser = await User.findOneAndDelete({ email });
      if (!deletedUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      return NextResponse.json({
        message: "User deleted successfully",
        success: true,
        deletedUser,
      });
    } else {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
