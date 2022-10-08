const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide rating"],
    },
    something: {
      type: Number,
      default: 1,
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide title"],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, "Please provide comment"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    collection: "reviews",
    timestamps: true,
  }
);

//review index
ReviewSchema.index({ product: 1, user: 1 }, { unquie: true });

//avrage rating caluculation
ReviewSchema.statics.caluculateAverageRating = async function (productId) {
  //look for reviews assiciated with a product

  const result = await this.aggreage([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$product",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  //optional chaining
  try {
    await this.model("product").findByIdAndUpdate(productId, {
      averageRating: result[0]?.averageRating || 0,
    });
  } catch (err) {
    throw err;
  }
};

/* end of caluculating average rating */

// save the review
ReviewSchema.post("save", async function () {
  await this.constructor.caluculateAverageRating(this.product);
});

//remove the review
ReviewSchema.post("remove", async function () {
  await this.constructor.caluculateAverageRating(this.product);
});

module.exports = mongoose.model("Review", ReviewSchema);
