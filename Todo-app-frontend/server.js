const express = require("express")
const path = require("path")
const cors = require("cors")
const app = express()
const corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "build")))

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

app.listen(9000)
