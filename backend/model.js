const mongoose = require("mongoose");


const seekerSchema = mongoose.Schema({
  // image: String,
//   resume: pdfSchema,
  fName: String,
  mName: String,
  lName: String,
  qualification: String,
  gender: String,
  dob: Date,
  phone: Number,
  email: String,
  password: String,
  address: Object
});

module.exports = mongoose.model("/SeekersProfiles", seekerSchema);
