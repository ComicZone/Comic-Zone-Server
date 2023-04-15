const {user} = require("../services/create.service");
const {
  hashPassword,
  verifyPassword,
} = require("../services/bcrypt.service");
const { generateToken } = require("../services/jwt.service");
const generateRandomAvatar = require("../services/avatar.service");
const adminSecretKey = process.env.JWT_SECRET_KEY_ADMIN;

const signup = async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber, role, adminKey } = req.body;

    // Checks for existing user
    const existingUser = await user.find({ email: email });

    if (existingUser && existingUser.email === email) {
      // Gives forbidden message
      return res.status(403).json({
        message: `Oops, it seems like this email is taken. Try a different email or try signing in if you're the one registered with this email`,
        success: false,
      });
    }

    // Generates a random avatar for the user
    const avatarUrl = await generateRandomAvatar(email);
    const avatar = `<img src="${avatarUrl}" alt="An avatar used to represent ${email} generated with their personal email.">`;

    // Hashes the user password for extra protection
    const safePassword = await hashPassword(password);

    let newUser;
    if (role === "admin" && adminKey === adminSecretKey) {
      // Creates a new admin account
      newUser = await user.create({
        fullname,
        email,
        password: safePassword,
        avatar,
        phoneNumber,
        role,
      });
    } else {
      // Creates a new user account
      newUser = await user.create({
        fullname,
        email,
        password: safePassword,
        phoneNumber,
        avatar,
      });
    }

    // Stores the returned user's unique id and role in an object to generate a token for the user
    const token = generateToken({ id: newUser._id });

    // Saves the user
    await newUser.save();

    // This saves the token as a cookie for the duration of its validity just to simulate how the request header works for the purpose of testing.
    res.cookie("token", token, { httpOnly: true });

    // Sends success message on the console
    console.log(`Token successfully generated for ${newUser.email}`);

    newUser = await user.findWithSpecificFields(
      {
        $and: [{ _id: newUser._id }, { email: newUser.email }],
      },
      "-password -deleted -cart -catalog -downloaded -role"
    );

    // Sends the token to the client side for it to be set as the request header using axios
    return res.json({
      message: `User successfully signed up!`,
      success: true,
      token: token,
      user: newUser,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      success: false,
    });
  }
};

// Signs a registered user in and gives them access to protected content with a token
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let foundUser;

    // Makes sure the user provides their email/username and password
    if (!email && !password)
      return res.status(400).json(`Fields cannot be empty`);
    if (!email)
      return res
        .status(400)
        .json(`Please enter your email address to continue`);
    if (!password)
      return res.status(400).json(`Please enter your password to continue`);

    // Makes sure a user isn't signing in with an email and username associated with a disabled user
    foundUser = await user.find({
      email: email,
    });

    // Returns a message if user doesn't exist
    if (!foundUser || foundUser === null) {
      return res.status(404).json({
        message: `User does not exist, would you like to sign up instead?`,
        success: false,
      });
    }

    // Checks if the password input by the client matches the protected password of the returned user
    const isValid = await verifyPassword(password, foundUser.password);

    // Sends a message if the input password doesn't match
    if (!isValid) {
      return res.status(401).json({
        message: `Incorrect password, please retype your password`,
        success: false,
      });
    }

    if (foundUser && foundUser.deleted === true)
      return res.status(403).json({
        message: `This email is associated with a disabled account, please try signing up with a different email`,
        success: false,
      });

    // Stores the returned user's unique id in an object to generate a token for the user
    const token = generateToken({ id: foundUser._id });

    // This saves the token as a cookie for the duration of its validity just to simulate how the request header works for the purpose of testing.
    res.cookie("token", token, { httpOnly: true });

    // Removes password from output
    foundUser = await user.findWithSpecificFields(
      {
        $and: [{ _id: foundUser._id }, { email: foundUser.email }],
      },
      "-password -deleted -cart -catalog -downloaded -role"
    );

    // Sends success message on the console
    console.log(`Token successfully generated for ${foundUser}`);

    // Sends the token to the client side for it to be set as the request header using axios
    return res.status(200).json({
      success: true,
      token: token,
      user: foundUser,
      message: `User succesfully logged in!`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

module.exports = { signup, login };
