const mail = require("../../../../email");
const user = require("../../../models/Users");
const validateRegisterInput = require("../../../validations/auth/register");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../../../../config/application").key;

exports.register = async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(422).json(errors);
  }

  const existingUser = await user.findOne({ email: req.body.email });
  if (existingUser) {
    // Email already exists
    return res.status(422).json({ message: "Email already exists" });
  }

  // existingUser = await user.findOne({ name: req.body.name });
  // if (existingUser) {
  //   // Name already exists
  //   return res.status(422).json({ message: "Name already exists" });
  // }

  const users = new user({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(users.password, salt, (err, hash) => {
      if (err) throw err;
      users.password = hash;
      users
        .save()
        .then((user) =>
          res.json({
            success: true,
          })
        )
        .catch((err) => console.log(err));
    });
  });
};
