const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/:id', authMiddleware, (req, res) => {
  console.log('Received GET request for user with ID:', req.params.id);
  userController.getUser(req, res);
});

router.put('/:id', authMiddleware, (req, res) => {
  console.log('Received PUT request for user with ID:', req.params.id);
  userController.updateUser(req, res);
});

module.exports = router;
