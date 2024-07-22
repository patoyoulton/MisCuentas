import React, { useContext, useEffect, useState } from 'react';
import transactionService from '../services/transactionService';
import { TransactionContext } from '../context/TransactionContext';

const Transactions = () => {
  const { transactions, setTransactions } = useContext(TransactionContext);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await transactionService.getTransactions();
      setTransactions(data);
    };
    fetchTransactions();
  }, [setTransactions]);

  return (
    <div>
      <h2>Transacciones</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>{transaction.note} - {transaction.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
