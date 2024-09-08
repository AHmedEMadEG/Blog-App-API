const CustomError = require("../utils/errors/CustomError");
const logger = require("../utils/logging/logger");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    logger.log({
      level: "error",
      message: err.message,
    });
    return res.status(err.statusCode).send({ error: err.message });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).send({ error: message });
};

module.exports = errorHandler;
