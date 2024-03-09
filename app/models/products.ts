import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  image: {
    url: {
      type: String,
    },
    alt: {
      type: String,
    },
    publicId: {
      type: String,
    },
  },
  mrp: Number,
  highlights: String,
  images: [
    {
      alt: String,
      url: String,
      publicId: String,
    },
  ],
  category: String,
  subCategory: String,
  brand: String,
  sizes: [
    {
      name: String,
      inStock: Boolean,
    },
  ],
});

const Products =
  mongoose.models.Products || mongoose.model("Products", productSchema);

export default Products;
