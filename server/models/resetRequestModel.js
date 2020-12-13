const mongoose = require("mongoose");
const requestSchema = new mongoose.Schema({
  uuid: {type: String},
  email: {type: String}
});
module.exports = Request = mongoose.model("Request", requestSchema);
