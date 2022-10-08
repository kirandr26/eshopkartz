const { StatusCode } = require("http-status-codes");

const errHandlerMiddleWare = (err, req, res, next) => {
  let customErr = {
    //default
    stasusCode: err.statusCode || StatusCode.INTERNAL_SERVER_ERROR, //500
    msg: err.message || "Something went wrong.. 500 error,try again later..",
  };
  //no validation
  if (err === " validationError") {
    customErr.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customErr.stasusCode = 400;
  }
  //no item found
  if (err === " castError") {
    customErr.msg = `no item found with id ${err.values}`;
    customErr.stasusCode = 404;
  }
  //duplicate value error
  if (err.code && err.code === 11000) {
    customErr.msg = `Duplicate value entred for ${object.keys(
      err.keyvalue
    )} field.. value already exists`;
    customErr.stasusCode = 404;
  }
  return res.status(customErr.stasusCode).json({ msg: customErr.msg });
};

module.exports = errHandlerMiddleWare;
