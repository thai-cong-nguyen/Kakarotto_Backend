const success = (statusCode, message, data = {}) => {
  return {
    error: false,
    code: statusCode,
    message,
    data,
  };
};

const error = (statusCode, message) => {
  // List of common HTTP request codes
  const codes = [400, 401, 403, 404, 500];

  // Get matched code
  const findCode = codes.find((code) => code == statusCode);

  if (!findCode) statusCode = 500;
  else statusCode = findCode;

  return {
    error: {
      code: statusCode,
      message,
      errors: [
        {
          domain: "global",
          reason: getReasonPhrase(statusCode),
          message,
          locationType: "server",
        },
      ],
    },
  };
};

const validation = (errors) => {
  return {
    error: {
      code: 422,
      message: "Validation Failed",
      errors: errors.map((err) => ({
        domain: "global",
        reason: "validationError",
        message: err.msg,
        locationType: err.param,
        location: err.location,
      })),
    },
  };
};

// Helper function to get reason phrase based on status code
const getReasonPhrase = (statusCode) => {
  const phrases = {
    400: "badRequest",
    401: "unauthorized",
    403: "forbidden",
    404: "notFound",
    500: "internalError",
  };

  return phrases[statusCode] || "unknownError";
};

const apiReturn = {
  success,
  error,
  validation,
};

export default apiReturn;
