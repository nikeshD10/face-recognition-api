const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    // host: "127.0.0.1",
    postgresql:
      "postgres:T2bcCdTYNJ3wHhg5vBu3@containers-us-west-46.railway.app:6532/railway",
    // user: "postgres",
    // password: "postgres",
    // database: "smart-brain",
  },
});
// const db = knex({
//   client: "pg",
//   connection:
//     "postgresql://postgres:T2bcCdTYNJ3wHhg5vBu3@containers-us-west-46.railway.app:6532/railway",
// });

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/signin", (req, res) => {
  signin.handleSignIn(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleGetProfile(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});
