import React from 'react';
import { formatAmount } from '../utils/formatAmount';

const BalanceCard = ({ balance }) => (
  <div className="col-md-4">
    <div className="card text-white bg-primary mb-3">
      <div className="card-body">
        <h5 className="card-title">Balance Actual</h5>
        <p className="card-text">${formatAmount(balance)}</p>
      </div>
    </div>
  </div>
);

export default BalanceCard;
