const express = require('express');
const accountController = require('../controllers/accountController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, accountController.addAccount);
router.get('/', authMiddleware, accountController.getAccounts);
router.delete('/:id', authMiddleware, accountController.deleteAccount);
router.put('/:id', authMiddleware, accountController.updateAccount);

module.exports = router;
