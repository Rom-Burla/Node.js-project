//                                                                                           בס"ד

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    biz: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// user vaidations method
userSchema.methods.userValidation = function (obj) {
  const JOI = require("joi");
  const schema = JOI.object({
    username: JOI.string().alphanum().required().min(5).max(12),
    email: JOI.string().email({
      minDomainSegments: 2,
      tlds: { allow: true },
    }),
    password: JOI.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),
  });
  return schema.validate(obj);
};

// encrypt password with bcrypt pre save
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.post("save", async function (doc, next) {
  console.log(`new user has been signed up \n ${doc}`);
  next();
});

// login static method
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      throw Error("Incorrect password");
    }
  } else {
    throw Error("Incorrect Email");
  }
};

const User = mongoose.model("User", userSchema, "Users");

module.exports = User;
