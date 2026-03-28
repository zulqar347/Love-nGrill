import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  try {
    await connectDB();
    const product = await Product.findById(id);
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  try {
    await connectDB();
    const product = Product.findByIdAndDelete(id);
    return NextResponse.json(
      { "Deleted Successfully": product },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ "Error Delteing Product": error });
  }
}
