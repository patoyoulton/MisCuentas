import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import transactionService from '../services/transactionService';
import accountService from '../services/accountService';
import TransactionForm from './TransactionForm';
import BalanceCard from './BalanceCard';
import AccountCard from './AccountCard';
import TransactionTable from './TransactionTable';
import FilterComponent from './FilterComponent';
import { Button, Modal } from 'react-bootstrap';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState(0);
  const [filter, setFilter] = useState({ month: '', year: '' });
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    const transactionsData = await transactionService.getTransactions();
    setTransactions(transactionsData);

    const accountsData = await accountService.getAccounts();
    setAccounts(accountsData);

    const totalBalance = accountsData.reduce((acc, account) => acc + account.currentBalance, 0);
    setBalance(totalBalance);
  };

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
    fetchAllData();
  };

  const handleUpdateTransaction = async (updatedTransaction) => {
    await transactionService.updateTransaction(updatedTransaction.id, updatedTransaction);
    setEditModal(false);
    fetchAllData();
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await transactionService.deleteTransaction(id);
      setTransactions(transactions.filter(transaction => transaction.id !== id));
      fetchAllData();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditTransaction(transaction);
    setEditModal(true);
  };

  const handleFilterChange = (name, value) => {
    setFilter({ ...filter, [name]: value });
  };

  const handleMonthChange = (direction) => {
    const currentMonth = parseInt(filter.month) || new Date().getMonth() + 1;
    let newMonth = currentMonth + direction;
    let newYear = parseInt(filter.year) || new Date().getFullYear();

    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }

    setFilter({ ...filter, month: newMonth.toString(), year: newYear.toString() });
  };

  const availableMonths = [...new Set(transactions.map(transaction => new Date(transaction.date).getMonth() + 1))];
  const availableYears = [...new Set(transactions.map(transaction => new Date(transaction.date).getFullYear()))];

  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return (!filter.month || transactionDate.getMonth() + 1 === parseInt(filter.month)) &&
           (!filter.year || transactionDate.getFullYear() === parseInt(filter.year)) &&
           (!selectedAccount || transaction.accountId === selectedAccount.id);
  });

  return (
    <div className="container-fluid mt-5">
      <h2 className="mb-4">Dashboard</h2>
      <p>Bienvenido, {user.username}</p>
      <div className="row mb-4">
        <BalanceCard balance={balance} />
        {accounts.map(account => (
          <AccountCard key={account.id} account={account} setSelectedAccount={setSelectedAccount} />
        ))}
      </div>
      <div className="mb-4">
        <Button variant="primary" onClick={() => setShowModal(true)}>Agregar Transacción</Button>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Transacción</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TransactionForm onAddTransaction={handleAddTransaction} accounts={accounts} />
        </Modal.Body>
      </Modal>
      {editModal && (
        <Modal show={editModal} onHide={() => setEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Transacción</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TransactionForm
              onAddTransaction={handleUpdateTransaction}
              accounts={accounts}
              transaction={editTransaction}
            />
          </Modal.Body>
        </Modal>
      )}
      <FilterComponent
        filter={filter}
        handleFilterChange={handleFilterChange}
        handleMonthChange={handleMonthChange}
        availableMonths={availableMonths}
        availableYears={availableYears}
      />
      <TransactionTable
        transactions={filteredTransactions}
        accounts={accounts}
        handleEditTransaction={handleEditTransaction}
        handleDeleteTransaction={handleDeleteTransaction}
      />
    </div>
  );
};

export default Dashboard;
