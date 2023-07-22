require("dotenv").config();
const express = require("express");
const app = express();
const cookietParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const connect = require("./config/db");
const User = require("./model/User");
const { isAuth } = require("./middlewares/auth");
const layout = require("express-ejs-layouts");
const methodOverride = require("method-override");

// setup middlewaress
app.use(express.json());
app.use(cookietParser());
app.use(express.static("public"));
app.use(layout);
app.use(methodOverride("_method"));

// setup views
app.set("view engine", "ejs");
app.set("layout", "./layout/main");

// connect to database
connect();

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({
      name,
      email,
      password,
    });
    res.json(user);
  } catch (error) {
    console.log(error.message);
  }
});
app.delete("/users/:id", (req, res) => {
  console.log(req.params.id);
  res.send("delete user");
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}`));
