import { connectDB } from "@/lib/db";
import Category from "@/lib/models/Categories";
import Product from "@/lib/models/Products";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();
    const categories = await Category.find();
    return NextResponse.json({ categories: categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { Error: "Error While Getting Categories" },
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { name } = body;
    if (!name) {
      return NextResponse.json(
        { message: "Category Must have a name" },
        { status: 400 },
      );
    }
    await connectDB();
    const newCategory = new Category(body);
    newCategory.save();
    return NextResponse.json(
      { message: "Category Created Successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ Error: error }, { status: 500 });
  }
};
