const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  img: { type: String },
  title: { type: String, required: true },
  address: { type: String, required: true },
  logo: { type: String, required: true },
  overviews: { type: String },
  keySkills: { type: Array, required: true, items: { type: String } },
  whyYouLoveWorkingHere: { type: String },
  url: { type: String, required: true, contentMediaType: "text" },
});

module.exports = mongoose.model("company", companySchema);
