'use strict';

function internalServerErrorHandler(err, req, res, next) {
  console.error(err.stack); // Log the error to the console for debugging (you can customize this)
  res.status(500).json({ error: 'Internal Server Error' });
}

module.exports = internalServerErrorHandler;
