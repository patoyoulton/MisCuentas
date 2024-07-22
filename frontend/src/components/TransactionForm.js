import React, { useState, useContext, useEffect } from 'react';
import transactionService from '../services/transactionService';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faStickyNote, faCalendarAlt, faMoneyBill, faUniversity } from '@fortawesome/free-solid-svg-icons';
import { formatAmount } from '../utils/formatAmount';

const TransactionForm = ({ onAddTransaction, accounts, transaction }) => {
  const { user } = useContext(AuthContext);
  const today = new Date().toISOString().split('T')[0];
  const [amount, setAmount] = useState(transaction ? transaction.amount : '');
  const [note, setNote] = useState(transaction ? transaction.note : '');
  const [type, setType] = useState(transaction ? transaction.type : 'expense');
  const [category, setCategory] = useState(transaction ? transaction.category : '');
  const [date, setDate] = useState(transaction ? transaction.date : today);
  const [currency, setCurrency] = useState(transaction ? transaction.currency : '');
  const [accountId, setAccountId] = useState(transaction ? transaction.accountId : '');

  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount);
      setNote(transaction.note);
      setType(transaction.type);
      setCategory(transaction.category);
      setDate(transaction.date);
      setCurrency(transaction.currency);
      setAccountId(transaction.accountId);
    }
  }, [transaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTransaction = {
      amount: parseFloat(amount),
      note,
      type,
      category,
      date,
      currency,
      userId: user.id,
      accountId
    };

    try {
      if (transaction) {
        await transactionService.updateTransaction(transaction.id, newTransaction);
      } else {
        await transactionService.addTransaction(newTransaction);
        onAddTransaction(newTransaction);
      }
    } catch (error) {
      console.error('Error adding/updating transaction:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="form-group">
        <label>Monto</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text"><FontAwesomeIcon icon={faDollarSign} /></span>
          </div>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="form-control" required />
        </div>
      </div>
      <div className="form-group">
        <label>Nota</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text"><FontAwesomeIcon icon={faStickyNote} /></span>
          </div>
          <input type="text" value={note} onChange={(e) => setNote(e.target.value)} className="form-control" required />
        </div>
      </div>
      <div className="form-group">
        <label>Tipo</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text"><FontAwesomeIcon icon={faMoneyBill} /></span>
          </div>
          <select value={type} onChange={(e) => setType(e.target.value)} className="form-control" required>
            <option value="" disabled>Selecciona una opción</option>
            <option value="expense">Gasto</option>
            <option value="income">Ingreso</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label>Categoría</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text"><FontAwesomeIcon icon={faStickyNote} /></span>
          </div>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="form-control" required />
        </div>
      </div>
      <div className="form-group">
        <label>Fecha</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text"><FontAwesomeIcon icon={faCalendarAlt} /></span>
          </div>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control" required />
        </div>
      </div>
      <div className="form-group">
        <label>Moneda</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text"><FontAwesomeIcon icon={faMoneyBill} /></span>
          </div>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="form-control" required>
            <option value="" disabled>Selecciona una opción</option>
            <option value="CLP">CLP</option>
            <option value="USD">USD</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label>Cuenta</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text"><FontAwesomeIcon icon={faUniversity} /></span>
          </div>
          <select value={accountId} onChange={(e) => setAccountId(e.target.value)} className="form-control" required>
            <option value="" disabled>Selecciona una opción</option>
            {accounts.map(account => (
              <option key={account.id} value={account.id}>{account.name}</option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className="btn btn-primary btn-block mt-3">
        {transaction ? 'Guardar Cambios' : 'Agregar Transacción'}
      </button>
    </form>
  );
};

export default TransactionForm;
