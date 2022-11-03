const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");

const app = express();

app.use(bodyParser.json());

const database = {
  users: [
    {
      id: "123",
      name: "Jhon",
      email: "jhon@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "987",
      hash: "",
      email: "jhon@gmail.com",
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/singin", (req, res) => {
  bcrypt.compare(
    "apples",
    "$2a$10$nheq5sKmjdLb0bcaDysTSe2SL3s6Affcw.i5xnpyp3HL3HfyHfAyS",
    function (err, res) {
      console.log("first guess", res);
    }
  );
  bcrypt.compare(
    "veggies",
    "$2a$10$nheq5sKmjdLb0bcaDysTSe2SL3s6Affcw.i5xnpyp3HL3HfyHfAyS",
    function (err, res) {
      console.log("second guess", res);
    }
  );
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("succes");
  } else {
    res.status(400).json("error logging in!");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, null, null, function (err, hash) {
    console.log(hash);
  });
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400), sent("user not found");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400), sent("user not found");
  }
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});

/* 
/ --> res = this is working
/singin --> POST = succes/fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT --> user

*/
