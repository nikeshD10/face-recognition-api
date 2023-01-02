const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const username = process.env.PGUSER;
const PORT = process.env.PGPORT || 3000;
const host = process.env.PGHOST;
const password = process.env.PGPASSWORD;
const database = process.env.PGDATABASE;
const database_url = process.env.DATABASE_URL;

const db = knex({
  client: "pg",
  connection:
    "postgres:T2bcCdTYNJ3wHhg5vBu3@containers-us-west-46.railway.app:6532/railway",
  // host: "127.0.0.1",

  // user: "postgres",
  // password: "postgres",
  // database: "smart-brain",
});

// const db = knex({
//   client: database,
//   connection:{
//     host : host,
//     port : PORT,
//     user : username,
//     password : password,
//     database : database,
//     socketPath  : database_url,
//   }

// postgresql:
// host: "127.0.0.1",

// user: "postgres",
// password: "postgres",
// database: "smart-brain",
// });

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
