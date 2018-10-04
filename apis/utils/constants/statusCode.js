/**
 * Created by kyle on 29/3/16.
 */

// We should only use the status code below according to their description.

exports.StatusCode = {
  // Eyerything is working
  OK: 200,

  // New resource has been created
  CREATED: 201,

  // Request is successful.
  NO_CONTENT: 204,

  // The client can use cached data
  NOT_MODIFIED: 304,

  // The request was invalid or cannot be served.
  BAD_REQUEST: 400,

  // The request requires an user authentication
  UNAUTHORIZED: 401,

  // The server understood the request, but is refusing it or the access is not allowed
  FORBIDDEN: 403,

  // There is no resource behind the URI
  NOT_FOUND: 404,

  // Should be used if the server cannot process
  UNPROCESSABLE_ENTITY: 422,

  // Generic server failure error. Should avoid this error.
  INTERNAL_SERVER_ERROR: 500,

  // The server is currently unable to receive requests. Please retry your request.
  SERVICE_UNAVAILABLE: 503

};
