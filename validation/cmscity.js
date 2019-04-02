const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCmsCity(data) {
  let errors = {};

  data.cityname = !isEmpty(data.cityname) ? data.cityname : "";
  data.country = !isEmpty(data.country) ? data.country : "";

  if (Validator.isEmpty(data.cityname)) {
    errors.cityname = "Cityname is required";
  }

  if (!Validator.isLength(data.cityname, { min: 2, max: 30 })) {
    errors.cityname = "City Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.country)) {
    errors.country = "Country is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
