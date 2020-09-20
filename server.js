/* const express = require("express");
const path = require("path");

const app = express();

// A test route to make sure the server is up
app.get("/api/ping", (request, response) => {
  console.log("Received GET request to /api/ping");
  response.send("pong!");
});

// TODO Add a route to /api/words-of-encouragement
// that returns an item from encouragement.json

// Express port-switching logic for development environment
// Doesn't need editing in this exercise
let port;
console.log("NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 8080;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 5000;
  console.log("Not seeing your changes as you develop?");
  console.log(
    "Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});
*/

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const items = require("./routes/api/items");
const app = express();
const path = require("path");
require("dotenv").config();

//console.log(process.env)

//bodyparser middleware
app.use(bodyParser.json());

app.use(cors());

//DB config
const db = require("./config/keys").mongoURI;

//connect to mongodb
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then((result) => console.log("connected"))
  .catch((e) => {
    console.log(e);
  });

mongoose.connection.on("connected", () => {
  console.log("mongoose connected");
});

//routes
app.use("/api/items", items);

// Express port-switching logic for development environment
// Doesn't need editing in this exercise
let port;
console.log("NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 5000;
  console.log("Not seeing your changes as you develop?");
  console.log(
    "Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});
