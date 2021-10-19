require("dotenv").config();
require("./DB/conn");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(require("./route/auth"));

const PORT = process.env.PORT || 8000;

// app.get("/contact", (req, res) => {
//   res.send("welcome to the Contact Page");
// });

// app.get("/signin", (req, res) => {
//   res.send("welcome to the signin Page");
// });

// app.get("/signup", (req, res) => {
//   res.send("welcome to the signup Page");
// });

app.listen(PORT, () => {
  console.log(`Server is listening at port number ${PORT}`);
});
