import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Accounts from './pages/Accounts';
import Reports from './pages/Reports';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import Settings from './pages/Settings'; // Asegúrate de importar Settings
import AuthProvider from './context/AuthContext';
import TransactionProvider from './context/TransactionContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <TransactionProvider>
        <Navbar />
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/transactions" component={Transactions} />
            <PrivateRoute path="/accounts" component={Accounts} />
            <PrivateRoute path="/reports" component={Reports} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/settings" component={Settings} />
            <PrivateRoute path="/add-transaction" component={TransactionForm} />
          </Switch>
        </div>
      </TransactionProvider>
    </AuthProvider>
  );
};

export default App;
