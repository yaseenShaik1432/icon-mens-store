import { NextRequest, NextResponse } from "next/server";
import Cart from "@/app/models/cart";
import { connect } from "@/app/database/dbConfig";

connect();

// add a Product to cart
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { productId, userId } = reqBody;
    const isCurrentCartItemAlreadyExists = await Cart.find({
      productId,
      userId,
    });
    if (isCurrentCartItemAlreadyExists?.length > 0) {
      return NextResponse.json({
        success: false,
        message:
          "Product is already added in cart! Please add different product",
      });
    }

    const saveProductToCart = await Cart.create(reqBody);
    if (saveProductToCart) {
      return NextResponse.json({
        success: true,
        message: "Product is added to cart !",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "failed to add the product to cart ! Please try again.",
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { cartId } = reqBody;

    const deleteCartItem = await Cart.findByIdAndDelete(cartId);

    if (deleteCartItem) {
      return NextResponse.json({
        success: true,
        message: "Cart Item deleted successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to delete Cart item ! Please try again.",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request?.nextUrl?.searchParams?.get("userId");

    const AllCartItems = await Cart.find({
      userId,
    });

    if (AllCartItems) {
      return NextResponse.json({ success: true, AllCartItems });
    } else {
      return NextResponse.json({
        success: false,
        message: "No Cart items are found !",
        status: 204,
      });
    }
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}
