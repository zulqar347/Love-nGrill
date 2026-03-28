import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String },
  description: { type: String },
});

categorySchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug = this.name
      ?.toLocaleLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  }
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
