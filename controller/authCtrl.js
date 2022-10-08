const User = require("../model/user");
const customErr = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { sendResWithCookies } = require("../util/jwt");
const sendEmail = require("../middleware/sendEmail");

const authCtrl = {
  register: async (req, res) => {
    const { name, email, mobile, password } = req.body;

    const emailAlreadyExists = await User.findOne({ email });

    if (emailAlreadyExists) {
      // throw new customErr.BadRequestErr("Email already exists.");
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Email already exists" });
    }

    const mobileAlreadyExists = await User.findOne({ mobile });

    if (mobileAlreadyExists) {
      // throw new customErr.BadRequestErr("Mobile Number already exists");
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Mobile Number already exists" });
    }
    const regTemplate = `<div>
          <h1>User Registration</h1>
          <h4>Hi, ${name}.. Thank you for registering with us</h4>
          <p>Happy Shopping...</p>
    </div>`;
    await User.create({ name, email, mobile, password });
    sendEmail(email, "User Registration", regTemplate);
    return res.json({ msg: "User registered successfully" });
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const extUser = await User.findOne({ email });
    if (!extUser)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User Doesn't exists" });
    // return res.json({ data: extUser });

    const isPasswordCorrect = await extUser.comparePassword(password);
    if (!isPasswordCorrect)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Incorrect Password" });

    //return res.json({ data: extUser });
    sendResWithCookies({
      res,
      statusCode: StatusCodes.OK,
      user: { name: extUser.name, userId: extUser.id, role: extUser.role },
    });
  },
  logout: async (req, res) => {
    res.cookie("refToken", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    return res.status(StatusCodes.OK).json({ msg: "User logged Out" });
  },
};

module.exports = authCtrl;
