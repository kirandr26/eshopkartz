const mongoose = require("mongoose");
const Product = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
      trim: true,
      maxlenght: [100, "Product name cann't be more than 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
      maxlenght: [
        1000,
        "Product description cann't be more than 1000 characters",
      ],
    },
    image: {
      type: Object,
      required: [true, "Please provide image properties"],
    },
    category: {
      type: String,
      required: [true, "Please provide category"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: [true, "Please provide stock inventory"],
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

/* Virtual Schema */
Product.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});
/* if delete product at the same time realted review shoud delete */
Product.pre("remove", async function (next) {
  await this.model("Review").deleteMany({ product: this._id });
  next();
});

module.exports = mongoose.model("Product", Product);
