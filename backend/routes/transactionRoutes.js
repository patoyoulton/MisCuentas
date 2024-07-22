const express = require('express');
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, transactionController.addTransaction);
router.get('/', authMiddleware, transactionController.getTransactions);
router.delete('/:id', authMiddleware, transactionController.deleteTransaction);
router.put('/:id', authMiddleware, transactionController.updateTransaction);

module.exports = router;
