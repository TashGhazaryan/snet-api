const express = require('express');

module.exports = (app) => {
  const router = express.Router();
  router.use('/auth', require('./auth'));
  router.use('/users', require('./users'));
  router.use('/status', require('./status'));

  app.use(router);
  return router;
};
