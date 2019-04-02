const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCmsItin(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.cityurl = !isEmpty(data.cityurl) ? data.cityurl : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title is required";
  }
  if (!Validator.isLength(data.title, { min: 2, max: 30 })) {
    errors.title = "Title must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.cityurl)) {
    errors.cityurl = "Parent City is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
