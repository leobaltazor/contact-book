const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const firebase = require("firebase");
const config = require("./config/config.json");
const users = require("./data/users.json");

const appFB = firebase.initializeApp({ ...config });
const _DB = appFB.database();

const auth1 = function(req, res, next) {
  var user = appFB.auth().currentUser;
  if (user !== null) {
    req.user = user.uid;
    // next()
  } else {
    user = "leobaltazorgmailcom";
    req.user = user;
    // when I fix the forwarding it should work
    // res.redirect("http://localhost:3000/auth");
  }
  next();
};

app.use(bodyParser.json());
app.use(cors());
app.use(auth1);

app.post("/api/auth", function(req, res) {
  const { login, password } = req.body;
  if (login && password) {
    appFB
      .auth()
      .signInWithEmailAndPassword(login, password)
      .then(data => {
        console.log("login " + data.user.uid);

        res.json({ token: login + Math.random(), uid: data.user.uid });
      })
      .catch(function(error) {
        if (error) {
          appFB
            .auth()
            .createUserWithEmailAndPassword(login, password)
            .then(data => {
              res.json({ token: login + Math.random(), uid: data.user.uid });
            })
            .catch(function(error) {
              if (error) {
                res.json({ token: "", message: error.message });
              }
            });
        } else {
        }
      });
  } else {
    res.json({ token: "", message: "not email or password" });
  }
  // res.json({ token: "" });
});

app.get("/users", function(req, res) {
  const dbRef = _DB
    .ref()
    .child("user")
    .child(req.user);
  dbRef.once("value", snapshot => {
    res.json(snapshot.val());
  });
  //   res.json(users);
});

app.post("/api/add", function(req, res) {
  //   uid = "Ptrl8Eru0DO0yzlGIaFQ47314xB2";
  //   addUser(uid);
  let uid = req.body.uid;
  let data = req.body.data;
  writeUserData(uid, data);
});

function writeUserData(uid, data) {
  console.log(data);
  _DB
    .ref()
    .child("user")
    .child(uid)
    .push()
    .set(data);
}

app.post("/api/update", function(req, res) {
  //   uid = "Ptrl8Eru0DO0yzlGIaFQ47314xB2";
  //   addUser(uid);
  //   console.log(req.body);

  let uid = req.body.uid;
  let data = req.body.data;
  let contact = req.body.contact;
  UpdateUserData(uid, contact, data);
});

function UpdateUserData(uid, contact, data) {
  console.log(uid);
  console.log(contact);
  console.log(data);
  _DB
    .ref()
    .child("user")
    .child(uid)
    .child(contact)
    .update(data);
}

app.post("/api/remove", function(req, res) {
  let uid = req.body.uid;
  let contact = req.body.key;
  console.log(uid);
  console.log(contact);
  try {
    removeUserData(uid, contact);
  } catch (e) {
    console.log(e);
  }
});

function removeUserData(uid, contact) {
  _DB
    .ref()
    .child("user")
    .child(uid)
    .child(contact)
    .remove();
}

app.listen(3001, () => console.log("server run 3001"));
