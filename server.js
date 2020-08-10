const express = require("express");
const app = express();
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");

//setup
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static(__dirname + "public"));
app.use(express.json());

//route set
const companyRouter = require("./routes/companies");
const indexRouter = require("./routes/index");
const applicantRouter = require("./routes/applicant");

//mongoose connect to mongodb
mongoose.connect("mongodb://localhost/newdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once("open", () => console.log("connected"))
  .on("error", (error) => {
    console.log(error);
  });

//route use
app.use("/company", companyRouter);
app.use("/index", indexRouter);
app.use("/applicant", applicantRouter);

app.listen(3000);
