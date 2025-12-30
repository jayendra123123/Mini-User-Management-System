const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log detailed error info for debugging
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.error('🔴 ERROR OCCURRED:');
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.error('📍 Endpoint:', req.method, req.originalUrl);
  console.error('⚠️  Error Type:', err.name);
  console.error('💬 Message:', err.message);
  if (err.stack) {
    console.error('📚 Stack Trace:');
    console.error(err.stack);
  }
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { message, statusCode: 400 };
  }

  // Send detailed error in development, generic in production
  const errorResponse = {
    success: false,
    message: error.message || 'Server Error',
    error: process.env.NODE_ENV === 'development' ? {
      type: err.name,
      endpoint: `${req.method} ${req.originalUrl}`,
      statusCode: error.statusCode || 500
    } : undefined
  };

  res.status(error.statusCode || 500).json(errorResponse);
};

module.exports = errorHandler;
