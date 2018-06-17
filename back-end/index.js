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
        res.json({ token: login + Math.random() });
      })
      .catch(function(error) {
        if (error) {
          appFB
            .auth()
            .createUserWithEmailAndPassword(login, password)
            .then(() => res.json({ token: login + Math.random() }))
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

app.listen(3001, () => console.log("server run"));
