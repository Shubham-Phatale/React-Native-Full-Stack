const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const connectToDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const homeRoutes = require("./routes/homeRoutes");

dotenv.config();

connectToDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1", homeRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`.bgGreen.white);
});
