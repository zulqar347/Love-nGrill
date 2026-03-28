import mongoose from "mongoose";
import Product from "./Products";

const orderSchema = new mongoose.Schema(
  {
    User: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    shippingAdress: { type: Map, of: String, required: true },
    totalAmount: { type: Number, default: 0 },
    totalItems: { type: Number, default: 0 },
    paymentMethod: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

orderSchema.pre("save", async function () {
  if (!this.isModified("products")) return;

  try {
    let totalAmount = 0;
    let totalItems = 0;
    for (const item of this.products) {
      const productData = await Product.findById(item.product);
      totalAmount += productData.price * item.quantity;
      totalItems += item.quantity;
    }
    this.totalAmount = totalAmount;
    this.totalItems = totalItems;
  } catch (error) {
    return error;
  }
});

orderSchema.index({ createdAt: -1 });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
