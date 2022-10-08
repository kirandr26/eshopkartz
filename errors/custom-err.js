//error handler

class CustomApiErr extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = CustomApiErr;

//baseclass =>customApiErr
//superclass =>Error contructor
