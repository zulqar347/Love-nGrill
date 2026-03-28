import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Products";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json("Error Getting Products");
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const body = await req.json();
    const { name, price, images } = body;
    if (!name || !price || !images) {
      return NextResponse.json("name, price, images are Necessary fields", {
        status: 500,
      });
    }
    const existingProduct = await Product.findOne({ name: name });
    if (existingProduct) {
      return NextResponse.json(`Product with Name '${name}' Already Exists`, {
        status: 200,
      });
    }
    const newProduct = new Product(body);
    newProduct.save();
    return NextResponse.json(`Product is Created: '${Product}'`, {
      status: 200,
    });
  } catch (error) {
    if (error) {
      console.error(error);
    }
    return NextResponse.json("Error");
  }
};
