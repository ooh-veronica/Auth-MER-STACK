const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const User = new mongoose.Schema(
  {
    id: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    CreatedAt: { type: Date, require: true },
    UpdatedAt: { type: Date, require: true },
    LastLoginAt: { type: Date },
    isBlocked: { type: Boolean, default: false },
  },
  { collection: "user-data" }
);

User.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const model = mongoose.model("user", User);

module.exports = model;
