const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCommentInput(data) {
  let errors = {};

  data.user = !isEmpty(data.user) ? data.user : "";
  data.message = !isEmpty(data.message) ? data.message : "";

  if (!Validator.isLength(data.message, { min: 10, max: 300 })) {
    errors.message = "Post must be between 10 and 300 characters";
  }

  if (Validator.isEmpty(data.message)) {
    errors.message = "Comment is required";
  }

  if (Validator.isEmpty(data.user)) {
    errors.user = "Username is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
