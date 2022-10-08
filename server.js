require("dotenv").config(); //env
require("express-async-errors");

//packages
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const rateLimiter = require("express-rate-limit");
const fileUpload = require("express-fileupload");
const { StatusCodes } = require("http-status-codes");
const path = require("path");

//Routes
const authRoute = require("./route/authRoute");
const userRoute = require("./route/userRoute");
const categoryRoute = require("./route/categoryRoute");
const productRoute = require("./route/productRoute");
const reviewRoute = require("./route/reviewRoute");

const PORT = process.env.PORT || 5200;

//middlewares

const notFoundMiddleware = require("./middleware/not-found");
const errHandlerMiddleWare = require("./middleware/error-handler");

const connectDb = require("./db/connect");

const app = express(); //refrence

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors()); // to avoid cross origin resourse sharing
//app.use(helmet()); //security packages
app.use(xss());
app.use(
  rateLimiter({
    windowMs: 60 * 1000, // minutes
    max: 150, //Limit each IP to 150 requests per `window` (here, per 15 minutes)
  })
);
app.use(cookieParser(process.env.JWT_SECRET)); //signed cookies
app.use(morgan("tiny"));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(errHandlerMiddleWare);
//default routes

app.use(`/api/v1/auth`, authRoute);
app.use(`/api/v1/users`, userRoute);
app.use(`/api/v1/category`, categoryRoute);
app.use(`/api/v1/product`, productRoute);
app.use(`/api/v1/review`, reviewRoute);
app.all(`/*`, notFoundMiddleware); //default route

/* add production build settings  */
if (process.env.NODE_DEV === "production") {
  app.use(express.static(`client/build`));
  app.get(`*`, (req, res) => {
    res.sendFile(path.join(__dirname + `/client/build/index.html`));
  });
}

const start = async () => {
  try {
    await connectDb();
    app.listen(
      PORT,
      console.log(`Server is running @ http://localhost:${PORT}`)
    );
  } catch (err) {
    return resizeBy.status(StatusCodes.BAD_REQUEST).json({ msg: err.message });
  }
};
start();
