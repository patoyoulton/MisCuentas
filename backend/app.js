const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const accountRoutes = require('./routes/accountRoutes');
const userRoutes = require('./routes/userRoutes'); // Importar las rutas del usuario
const { connectToDatabase } = require('./config/config');
const errorHandler = require('./middlewares/errorHandler'); // Importar el manejador de errores

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(logger.requestLogger);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/users', userRoutes); // Añadir la ruta del usuario

// Error handling middleware
app.use(logger.errorLogger);
app.use(errorHandler); // Añadir el manejador de errores

// Connect to database
connectToDatabase();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  logger.info(`Server is running on port ${PORT}`);
});

module.exports = app;
