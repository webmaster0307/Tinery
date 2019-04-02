const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCmsActivity(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.activitykey = !isEmpty(data.activitykey) ? data.activitykey : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title is required";
  }

  if (!Validator.isLength(data.title, { min: 2, max: 30 })) {
    errors.title = "Title must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.activitykey)) {
    errors.activitykey = "Parent Itinerary is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
