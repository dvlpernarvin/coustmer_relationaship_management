// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const userRoutes = require('./Routes/UserRoute');

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('MongoDB Connected'))
//   .catch(err => console.error('MongoDB Connection Failed:', err));

// app.get('/', (req, res) => {
//     res.status(200).json({ message: 'Backend is connected successfully' });
// });

// // Routes
// app.use('/api/users', userRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const authRoutes = require("./Routes/UserRoute");
require("dotenv").config();


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/api", authRoutes);
// ✅ Wait for the database to connect before starting the server
connectDB().then(() => {
  const dbName = mongoose.connection.name; // ✅ Correct way to get DB name
  console.log(`Connected to Database: ${dbName}`);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
