const express = require("express");
const app = express();
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandller = require("./middleware/errorHandller");
const path = require("path");
const port = process.env.PORT || 3000;

// custom Middleware function
app.use(logger);

// cross origin resource sharing
const whitelist = ["https://www.google.com", "http//localhost:3000"]; //only this domain can request to this server
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      //TODO:!origin means undefine (just for development purposes)
      //means if available in the list than pass
      callback(null, true); //null is for err and true will be pass for access
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//content-type: application/x-www-form-urlencoded (in other words, form data)
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

//This will supply static files like css / img to these direcotires
app.use("/", express.static(path.join(__dirname, "/public"))); // "/" is by default of dont need to mantion it
app.use("/subdir", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employee"));

// if nothing get match thid will get executed (any type of req get/post/update etc)
app.all("*", (req, res) => {
  //   res.status(404).send("404 not found YEP");

  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found json" });
  } else {
    res.type("txt").send("404 not found text");
  }
});

//TODO: custom express error handeller
app.use(errorHandller);

app.listen(port, () => console.log(`listning at port ${port}`));
