const { createUserSchema, updateUserSchema } = require("../services/joi.service");

// Catching required fields errors when creating a user
const validateUserInputsToCreate = (req, res, next) => {
  try {
    const validateInput = createUserSchema.validate(req.body);

    if (validateInput.error)
      return res.status(400).json({
        success: false,
        errormessage: validateInput.error.details[0].message,
      });

    console.log("User input validated successfully");
    next();
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      success: false,
    });
  }
};

// Catching required fields errors when creating a user
const validateUserInputsToUpdate = (req, res, next) => {
  try {
    const validateInput = updateUserSchema.validate(req.body);

    if (validateInput.error)
      return res.status(400).json({
        success: false,
        errormessage: validateInput.error.details[0].message,
      });

    console.log("User input validated successfully");
    next();
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      success: false,
    });
  }
};

//function created using currying method
const validate = (schema) => {
  return function(req, res, next) {
    const {error, value} = schema.validate(req.body, {
      abortEarly: false
    });
    if(error) {
      let errorMessage = [];
      error.details.forEach(detail => {
        errorMessage.push(detail.message);
      });
      return res.status(403)
        .send({
          message: errorMessage,
          success: false
        });
    }
    //re-assign req.body to the validated sanitized value
    req.body = value;
    next();
  }
}

module.exports = { validateUserInputsToCreate, validateUserInputsToUpdate, validate }