const { STATUS, ERROR_NAMES } = require("@/app/api/constants");

export const handleError = (error) => {
  const err = {};
  if (error.name === ERROR_NAMES.ValidationError) {
    const errors = [];
    Object.keys(error.errors).forEach((key) => {
      const { path, message, type } = error.errors[key].properties;
      const newError = {
        path,
        message,
        type,
      };
      errors.push(newError);
    });
    err.status = STATUS.BadRequest;
    err.errors = errors;
  }

  if (error.name === ERROR_NAMES.CastError) {
    err.status = STATUS.BadRequest;
    err.message = "Invalid Id";
  }

  return err;
};
