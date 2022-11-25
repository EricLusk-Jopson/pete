const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

const port = process.env.PORT || 5000;

// TODO - connect to mongoDB
connectDB();

// initialize express
const app = express();

// TODO - middleware for handling JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TODO - routing for games API
// app.use("/api/games", require("./routes/gameRoutes"))

// routing for users api
app.use("/api/users", require("./routes/userRoutes.js"));

// run the application
app.listen(port, () => console.log(`Server started on port ${port}`));
