const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectToDatabase } = require('./config/config');
const { logger, requestLogger, errorLogger } = require('./utils/logger');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const accountRoutes = require('./routes/accountRoutes');
const userRoutes = require('./routes/userRoutes'); // Asegúrate de importar userRoutes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(requestLogger);

// Servir archivos estáticos desde el directorio uploads
app.use('/api/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/users', userRoutes); // Asegúrate de usar userRoutes

// Error handling middleware
app.use(errorLogger);

// Connect to database
connectToDatabase();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  logger.info(`Server is running on port ${PORT}`);
});

module.exports = app;
