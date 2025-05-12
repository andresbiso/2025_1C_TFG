const express = require("express");
const app = express();

// packages
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

// connection to DB and nextcloud
const { connectMongoDB } = require("./config/mongodb");
const { nextcloudConnect } = require("./config/nextcloud");

// routes
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const paymentRoutes = require("./routes/payments");
const courseRoutes = require("./routes/course");

// middleware
app.use(express.json()); // to parse json body
app.use(cookieParser());
app.use(
  cors({
    // origin: 'http://localhost:8083', // frontend link
    origin: "*",
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});

// connections
connectMongoDB();
nextcloudConnect();

// mount route
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);

// Default Route
app.get("/", (req, res) => {
  // console.log('Your server is up and running..!');
  res.send(`<div>
    This is Default Route  
    <p>Everything is OK</p>
    </div>`);
});
