import React, { useContext, useEffect, useState } from 'react';
import accountService from '../services/accountService';
import { AuthContext } from '../context/AuthContext';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAccounts = async () => {
      const data = await accountService.getAccounts(user.id);
      setAccounts(data);
    };
    fetchAccounts();
  }, [user.id]);

  return (
    <div>
      <h2>Cuentas</h2>
      <ul>
        {accounts.map(account => (
          <li key={account.id}>{account.name} - {account.bank}</li>
        ))}
      </ul>
    </div>
  );
};

export default Accounts;
