import React from 'react';
import { formatAmount } from '../utils/formatAmount';

const AccountCard = ({ account, setSelectedAccount }) => (
  <div className="col-md-4" key={account.id}>
    <div className="card text-white bg-secondary mb-3">
      <div className="card-body">
        <h5 className="card-title">{account.name}</h5>
        <p className="card-text">{account.bank} - ${formatAmount(account.currentBalance)} {account.currency}</p>
        <button className="btn btn-light" onClick={() => setSelectedAccount(account)}>Ver Transacciones</button>
      </div>
    </div>
  </div>
);

export default AccountCard;
