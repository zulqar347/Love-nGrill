import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Orders";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    // Check whether the use is signed in or not
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    // find the order by order id
    const { id } = await params;
    await connectDB();
    const order = await Order.findById(id);
    // check it the order exist against the id provided
    if (!order) {
      return NextResponse.json(
        { message: "Unable To Find Order Against this user" },
        { status: 400 },
      );
    }
    return NextResponse.json({ order: order }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ Error: error }, { status: 500 });
  }
};
