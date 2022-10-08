const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      maxlenght: 50,
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email",
      },
    },
    mobile: {
      type: String,
      required: [true, "Please provide mobile number"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
      maxlenght: 16,
    },
    profile_img: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png",
      },
    },
    // address: {
    //   type: Object,
    //   default: {},
    // },
    cart: {
      type: Array,
      default: [],
    },
    wishlist: {
      type: Array,
      default: [],
    },
    orders: {
      type: Array,
      default: [],
    },
    role: {
      type: String,
      enum: ["superadmin", "user", "associate"],
      default: "user",
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

/* Encrypt the password */
UserSchema.pre("save", async function () {
  //res.json({ data: this.model("user") });
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/* Comapre password with stored password */

UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
