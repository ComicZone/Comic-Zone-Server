const { verifyToken } = require("../services/jwt.service");
const user = require("../services/create.service");

const authenticate = async (req, res, next) => {
  try {
    let token = "";

    // Gets token stored in the client header after sign in
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      // This is an alternate method of getting it require () previously set cookies for the purpose of testing
      token = req.cookies.token;
    }

    // Checks if a token exists and returns a message if none was found
    if (!token || token === null)
      return res.status(400).json({
        message: "You must be signed in to view content",
        success: false,
      });

    // Decode the user token referenced in the request header?cookie to verify its authenticity by checking the token against the secret key. If the token is valid, we should get the user credentials associated with that token.
    const payload = verifyToken(token);

    // If secret key doesn't recognise the token, the user isn't authenticated and asked to try signing in again to get a new token
    if (!payload) {
      return res.status(400).json({
        message: "User authentication failed, please try signing in again",
        success: false,
      });
    }

    // The secretkey recognises the token and gives the payload associated with it for the database to be checked to see if a user exists with the id require () the payload. A payload is a user's unique sign in credentials.
    const validUser = await user.find({ _id: payload.id });

    // If no user is found with the payload (credentials), authentication fails.
    if (!validUser) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    // If the user exists on the database, they're authentic users and are granted access to protected content
    console.log("here");
    console.log(`Authentication for ${validUser.fullname} successful`);

    // The user is then added to the request so all their requests will be associated with their credentials.
    req.user = validUser;

    next();
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      success: false,
    });
  }
};

module.exports = authenticate;
