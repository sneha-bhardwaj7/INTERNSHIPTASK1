const mongoose = require('mongoose');
const { ZodError } = require('zod');
const { ApiError } = require('../utils/ApiError');

function mapZodError(error) {
  return error.issues.reduce((accumulator, issue) => {
    const key = issue.path.join('.') || 'form';
    accumulator[key] = issue.message;
    return accumulator;
  }, {});
}

function errorHandler(error, _request, response, _next) {
  if (error instanceof ApiError) {
    return response.status(error.statusCode).json({
      message: error.message,
      details: error.details
    });
  }

  if (error instanceof ZodError) {
    return response.status(400).json({
      message: 'Validation failed.',
      errors: mapZodError(error)
    });
  }

  if (error instanceof mongoose.Error.CastError) {
    return response.status(400).json({
      message: 'Invalid resource id.',
      errors: { id: 'The supplied id is not valid.' }
    });
  }

  if (error instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(error.errors).reduce((accumulator, current) => {
      accumulator[current.path] = current.message;
      return accumulator;
    }, {});

    return response.status(400).json({
      message: 'Validation failed.',
      errors
    });
  }

  if (error?.code === 11000) {
    const field = Object.keys(error.keyValue || {})[0] || 'form';
    return response.status(409).json({
      message: 'A record with this value already exists.',
      errors: { [field]: 'This value already exists.' }
    });
  }

  console.error(error);
  return response.status(500).json({
    message: 'An unexpected server error occurred.'
  });
}

module.exports = { errorHandler };
