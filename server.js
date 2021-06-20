const express = require("express");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./server/database/connection");
const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

app.use(morgan("tiny"));

connectDB();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.set("view engine", "ejs");
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

app.use("/", require("./server/routes/router"));
// Listen to the App Engine-specified port, or 8080 otherwise
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// [END app]
