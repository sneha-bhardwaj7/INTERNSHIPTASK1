const { ApiError } = require('../utils/ApiError');

function notFound(_request, _response, next) {
  next(new ApiError(404, 'Route not found.'));
}

module.exports = { notFound };
