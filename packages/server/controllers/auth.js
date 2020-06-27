const { validationResult } = require("express-validator");

const userQueries = require("../data/queries/user");
const { hashPassword, compareHash } = require("../services/bcrypt");
const signToken = require("../services/signToken");
const guestServices = require("../services/guestServices");

const checkValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
};

const signup = async (req, res, next) => {
  checkValidationErrors(req, res);
  const user = req.body;
  try {
    delete user.confirmPassword;
    const existingUser = await userQueries.findUserByNameOrEmail(user);
    const hashedPassword = await hashPassword(user.password);
    const secureUser = { ...user, password: hashedPassword };
    if (existingUser.length) {
      return res
        .status(409)
        .json({ errors: [{ auth: "User already exists!" }] });
    }

    const newUser = await userQueries.insertUser(secureUser);
    signToken(res, newUser);
    res.status(201).json({ ...newUser });
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req, res, next) => {
  checkValidationErrors(req, res);
  const user = req.body;

  try {
    const queryResults = await userQueries.findUserByNameOrEmail(user);
    const savedUser = queryResults[0] || null;

    if (!savedUser) {
      return res.status(401).send({ errors: "bad credentials" });
    }

    const hashedPassword = savedUser.password;
    const passwordMatch = await compareHash(user.password, hashedPassword);

    if (!passwordMatch) {
      return res.status(401).send({ errors: "bad credentials" });
    }

    const authorizedUser = { ...savedUser };
    delete authorizedUser.password;

    signToken(res, authorizedUser);
    res.send({ ...authorizedUser }).status(200);
  } catch (e) {
    res.status(500).send({ errors: e });
  }
};

const guest = async (req, res, next) => {
  try {
    // username generator returns `Guest-${num}`
    const { username, password } = guestServices.generateGuest();
    // generateGuestUser();
    const email = null;
    // id generator returns `
    const id = null;
    const user = { username, email, id };
    signToken(res, user);
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send({ errors: e });
  }
};

module.exports = {
  signup,
  login,
  guest,
};
