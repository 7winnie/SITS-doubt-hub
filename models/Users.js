const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    bookmarks: {
      type: Array,
    },
    category: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['teacher', 'student'],
      default: 'student',
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
