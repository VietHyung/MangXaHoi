const mongoose = require("mongoose");
const { isEmail, contains } = require("validator");
const filter = require("../util/filter");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [6, "Phải dài ít nhất 6 ký tự"],
      maxlength: [30, "Không được dài quá 30 ký tự"],
      validate: {
        validator: (val) => !contains(val, " "),
        message: "Không được chứa khoảng trắng",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "Phải là địa chỉ email hợp lệ"],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Phải có độ dài ít nhất 8 ký tự"],
    },
    biography: {
      type: String,
      default: "",
      maxLength: [250, "Không được dài quá 250 ký tự"],
    },
    phonenumber: {
      type: String,
      default: "",
      maxLength: [10, "Không được dài quá 10 ký tự"],
    },
    address: {
      type: String,
      default: "",
      maxLength: [250, "Không được dài quá 250 ký tự"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  if (filter.isProfane(this.username)) {
    throw new Error("Tên người dùng không được chứa từ tục tĩu");
  }

  if (this.biography.length > 0) {
    this.biography = filter.clean(this.biography);
  }

  next();
});

module.exports = mongoose.model("user", UserSchema);
