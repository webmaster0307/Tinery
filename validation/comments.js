const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCommentInput(data) {
  let errors = {};

  data.message = !isEmpty(data.message) ? data.message : "";

  if (!Validator.isLength(data.message, { min: 10, max: 300 })) {
    errors.message = "Post must be between 10 and 300 characters";
  }

  if (Validator.isEmpty(data.message)) {
    errors.message = "Comment is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
