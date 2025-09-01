import winston from 'winston';

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log' }),
  ],
});

export default function errorHandler(err, req, res, next) {
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (err.name === 'SyntaxError' && err.message.includes('URI malformed')) {
    return res.status(400).json({ error: 'Malformed URI in request' });
  }

  res.status(statusCode).json({
    error: process.env.NODE_ENV === 'production' ? message : err.stack,
  });
}