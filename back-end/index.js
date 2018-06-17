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

app.get("/api/add", function(req, res) {
  uid = "Ptrl8Eru0DO0yzlGIaFQ47314xB2";
  //   addUser(uid);
  writeUserData(uid);
});

function addUser(uid) {
  _DB.ref("user/" + uid).set({});
}

function writeUserData(uid, data) {
  _DB
    .ref()
    .child("user")
    .child(uid)
    .push()
    .set({
      id: 10,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496"
        }
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets"
      }
    });
}

app.post("/api/remove", function(req, res) {
  console.log(req.body.uid);
  let uid = req.body.uid;
  let contact = req.body.key;
  removeUserData(uid, contact);
});

function removeUserData(uid, contact) {
  _DB
    .ref()
    .child("user")
    .child(uid)
    .child(contact)
    .remove();
}

app.listen(3001, () => console.log("server run"));
