import createErrors from "http-errors";

const badRequest = (err, req, res) => {
  const error = new createErrors.BadRequest(err);
  console.log(err);
  return res.status(error.status).json({
    error: {
      code: error.status,
      message: err.message,
      errors: [
        {
          domain: "global",
          reason: "Bad Request",
          message: err.message,
          locationType: "body",
          location: req.path,
        },
      ],
    },
  });
};

const internalServerError = (err, req, res) => {
  const error = new createErrors.InternalServerError(err);

  return res.status(error.status).json({
    error: {
      code: error.status,
      message: err.message,
      errors: [
        {
          domain: "global",
          reason: "Internal Error",
          message: err.message,
          locationType: "server",
          location: req.path,
        },
      ],
    },
  });
};

const notFound = (err, req, res, next) => {
  const error = new createErrors.NotFound(err);

  return res.status(error.status).json({
    error: {
      code: error.status,
      message: err.message,
      errors: [
        {
          domain: "global",
          reason: "Not Found",
          message: err.message,
          locationType: "resource",
          location: req.path,
        },
      ],
    },
  });
};

const forbidden = (err, req, res, next) => {
  const error = new createErrors.Forbidden(err);

  return res.status(error.status).json({
    error: {
      code: error.status,
      message: err.message,
      errors: [
        {
          domain: "global",
          reason: "For Bidden",
          message: err.message,
          locationType: "auth",
          location: req.path,
        },
      ],
    },
  });
};

const unauthorized = (err, req, res, next) => {
  const error = new createErrors.Unauthorized(err);

  return res.status(error.status).json({
    error: {
      code: error.status,
      message: err.message,
      errors: [
        {
          domain: "global",
          reason: "Unauthorized",
          message: err.message,
          locationType: "auth",
          location: req.path,
        },
      ],
    },
  });
};

export { badRequest, internalServerError, notFound, forbidden, unauthorized };
