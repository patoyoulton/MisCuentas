const userModel = require('../models/userModel');
const { logger } = require('../utils/logger');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Verificar y crear el directorio si no existe
const uploadDir = 'uploads/profileImages/';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de multer para el almacenamiento de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${req.userId}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage }).single('profileImage');

const updateUser = (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        logger.error(`Error uploading image: ${err.message}`);
        return res.status(500).send('Error uploading image');
      }
  
      const userId = req.userId || req.params.id; // Asegurarse de obtener el userId de params si no está disponible en req.userId
      const user = {
        ...req.body,
        profileImage: req.file ? req.file.filename : req.body.profileImage
      };
  
      logger.info(`Updating user with ID: ${userId}`);
      logger.info(`Received user data: ${JSON.stringify(user)}`);
  
      userModel.updateUser(userId, user, (err, result) => {
        if (err) {
          logger.error(`Error updating user: ${err.message}`);
          return res.status(500).send('Error updating user');
        }
        res.status(200).send(result);
      });
    });
  };
  

const getUser = (req, res) => {
  const userId = req.params.id;
  logger.info(`Fetching user with ID: ${userId}`);

  userModel.findUserById(userId, (err, user) => {
    if (err) {
      logger.error(`Error fetching user: ${err.message}`);
      return res.status(500).send('Error fetching user');
    }
    if (!user) {
      logger.warn(`User with ID: ${userId} not found`);
      return res.status(404).send('User not found');
    }
    res.status(200).send(user);
  });
};

module.exports = {
  updateUser,
  getUser
};
