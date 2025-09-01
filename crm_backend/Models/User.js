// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     companyName: { type: String, required: true },
//     uniqueRegistrationCode: { type: String, required: true, unique: true },
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     phoneNumber: { type: String, required: true },
//     password: { type: String, required: true },
//     confirmPassword: { type: String, required: true },
//     userType: { type: String, required: true, enum: ['Admin', 'Client', 'Supplier'] }
// });

// module.exports = mongoose.model('User', userSchema);



const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["Representative", "Supplier", "Client"], required: true },
    companyName: { type: String, required: true },
    uniqueRegistrationCode: { type: String, required: true, unique: true, default: () => Math.floor(10000000 + Math.random() * 90000000).toString() },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Hash password before saving (only if modified)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
