import { connect } from "@/app/database/dbConfig";
import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import Products from "@/app/models/products";
import { NextRequest, NextResponse } from "next/server";

connect();

// Get Individual Product by id
export async function GET(request: NextRequest, { params }: any) {
  try {
    const { id } = params;
    const product = await Products.findOne({ _id: id });

    return NextResponse.json({
      product,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// Delete Individual Product by id
export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const { id } = params;
    const tokenData = await getDataFromToken(request);
    if (tokenData.isAdmin) {
      const product = await Products.findOne({ _id: id });
      if (!product) {
        return NextResponse.json(
          { error: "Product Not Found" },
          { status: 404 }
        );
      }
      await Products.deleteOne({ _id: id });
      return NextResponse.json({
        message: "product deleted successfully",
      });
    } else {
      return NextResponse.json(
        { error: "Not a admin to delete" },
        { status: 401 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// Edit Individual Product by id
export async function PUT(request: NextRequest, { params, body }: any) {
  try {
    const { id } = params;
    const reqBody = await request.json();
    const {
      title,
      price,
      description,
      category,
      mrp,
      subCategory,
      brand,
      highlights,
      sizes,
    } = reqBody;

    const tokenData = await getDataFromToken(request);
    if (tokenData.isAdmin) {
      const updatedProduct = await Products.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            title,
            price,
            description,
            category,
            mrp,
            subCategory,
            brand,
            highlights,
            sizes,
          },
        },
        { new: true }
      );

      if (!updatedProduct) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        message: "product updated successfully",
        product: updatedProduct,
      });
    } else {
      return NextResponse.json({ error: "not an admin" }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
