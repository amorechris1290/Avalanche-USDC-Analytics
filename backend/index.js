/**
 * Entry point for the backend application.
 * @module backend/index
 */

const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const usdcController = require('./controllers/usdcController');

const app = express();

// Routes
app.use('/api', usdcController);

// Error handling middleware
app.use(errorHandler);

/** Port number for the server to listen on. */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
