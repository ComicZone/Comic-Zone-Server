const { model, Schema } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      minlength: 11,
      maxlength: 11,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    cart: [
      {
        type: ObjectId,
        ref: "Comic",
      },
    ],
    catalog: [
      {
        type: ObjectId,
        ref: "Comic",
      },
    ],
    role: {
      type: String,
      lowercase: true,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;