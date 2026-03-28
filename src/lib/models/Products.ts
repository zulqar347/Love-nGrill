import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String },
    shortDescription: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    sizes: [{ type: String }],
    colors: [{ type: String }],
    images: { type: Map, of: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
  },
);

productSchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug = this.name
      ?.toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  }
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
