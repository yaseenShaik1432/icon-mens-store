import { NextRequest, NextResponse } from "next/server";
import Products from "@/app/models/products";
import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import { connect } from "@/app/database/dbConfig";

connect();

// Create a Product
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      title,
      price,
      description,
      images,
      category,
      sizes,
      highlights,
      image,
      mrp,
      brand,
      subCategory,
    } = reqBody;
    const tokenData = await getDataFromToken(request);
    if (tokenData.isAdmin) {
      const data = await Products.create({
        title,
        price,
        mrp,
        brand,
        description,
        highlights,
        images,
        image,
        category,
        sizes,
        subCategory,
      });

      return NextResponse.json({
        message: "Item added successfully",
        success: true,
        data,
      });
    } else {
      return NextResponse.json(
        { error: "You are not Authorized!" },
        { status: 401 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// Get all products
export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get("category");
    const allProducts = await Products.find().sort({ _id: "desc" });

    if (category) {
      const filteredData = allProducts.filter(
        (item) => item.subCategory === category
      );
      if (filteredData?.length > 0) {
        return NextResponse.json({
          allProducts: filteredData,
        });
      } else {
        return NextResponse.json({ allProducts: [] }, { status: 404 });
      }
    }

    if (allProducts.length < 0) {
      return NextResponse.json({ error: "NO DATA" }, { status: 404 });
    }
    return NextResponse.json({
      allProducts,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
