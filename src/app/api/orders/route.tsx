import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Orders";
import Product from "@/lib/models/Products";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";

export const GET = async () => {
  try {
    // check whether the user is signed in or not
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    const { user } = session;
    await connectDB();
    let orders;
    // check if user is admin return all the orders along with users info
    // if user is not admin but only a customer return the orders placed by the user
    if (user.role === "admin") {
      orders = await Order.find().populate("User");
    } else {
      orders = await Order.find({ user: user.id }).populate("products.product");
    }
    // return the orders
    return NextResponse.json({ orders: orders }, { status: 200 });
  } catch (error) {
    // Handler if any error
    console.error(error);
    return NextResponse.json(
      { message: "Error While Fetching Orders" },
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { user, products, shippingAdress, paymentMethod } = body;
    if (!user || !products || !shippingAdress || !paymentMethod) {
      return NextResponse.json(
        {
          message: `the Fields 'user, products, shippingAdress, payment Adress' are necessary`,
        },
        { status: 400 },
      );
    }
    // console.log(body);
    const newOrder = new Order(body);
    newOrder.save();
    return NextResponse.json(
      { message: "Order Created Successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error While Creating Order" },
      { status: 500 },
    );
  }
};
