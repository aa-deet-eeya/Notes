require("dotenv").config();
const express = require("express");
const CORS = require("cors");
const morgan = require("morgan");

// MongoDB setup
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB up and running.....");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
const PORT = process.env.PORT || 8000;
const notes = require("./routes/api/notes");
const users = require("./routes/api/users");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(CORS());
app.use(morgan("dev"));

//Routes
app.use("/api/notes", notes);
app.use("/api/users", users);

// 404 and 500 handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;

  next(error);
  //res.send("hello")
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send("404 Not found");
});

// Listen to PORT
app.listen(PORT, () => {
  console.log(`Server up and running at http://localhost/:${PORT}`);
});
