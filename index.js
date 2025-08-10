require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cors = require("cors");


const PORT = process.env.PORT || 3000;


const authRoute = require("./routes/authRoutes");
const cardRoute = require("./routes/cardRoutes")
const planRoute = require("./routes/planRoutes")

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: '*', // Allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed methodss
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies/auth headers
}));

app.use(express.json());

mongoose
  .connect("mongodb+srv://patelrajeev10342:T1ej9XOrMzmr1FFe@cluster0.u5hkmz6.mongodb.net/EaseWithBackendNewVps?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));


  console.log("MONGO_URL:", process.env.MONGO_URL);

app.use("/auth",authRoute);   
app.use("/api/cards", cardRoute)
app.use("/api/plans", planRoute)  

app.use('/health', (req, res) => {
  res.status(200).json({ status: "UP" });
}
);


app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*'); // Dynamically allow origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true'); // Required if credentials are used
  next();
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});