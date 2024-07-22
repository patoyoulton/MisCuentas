import React, { useState, useEffect, useContext } from 'react';
import accountService from '../services/accountService';
import userService from '../services/userService';
import { AuthContext } from '../context/AuthContext';
import { Tabs, Tab, Button } from 'react-bootstrap'; // Asegúrate de importar Button aquí
import ProfileForm from '../components/ProfileForm';
import AccountForm from '../components/AccountForm';
import AccountList from '../components/AccountList';

const Settings = () => {
  const { user, login } = useContext(AuthContext);
  const [accounts, setAccounts] = useState([]);
  const [accountData, setAccountData] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    gender: '',
    birthday: '',
    profileImage: null
  });

  useEffect(() => {
    const fetchAccounts = async () => {
      if (user) {
        try {
          const data = await accountService.getAccounts(user.id);
          setAccounts(data);
        } catch (error) {
          console.error('Error fetching accounts:', error);
        }
      }
    };

    const fetchUserProfile = async () => {
      try {
        console.log('Starting fetchUserProfile');
        const data = await userService.getUserProfile(user.id);
        console.log('Fetched user profile data:', data);
        setProfileData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          phone: data.phone || '',
          gender: data.gender || '',
          birthday: data.birthday || '',
          profileImage: data.profileImage || null
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
        console.error('Error details:', error.response ? error.response.data : error.message);
        console.error('Config details:', error.config);
        console.error('Request details:', error.request);
      }
    };

    fetchAccounts();
    fetchUserProfile();
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setProfileData({ ...profileData, profileImage: files[0] });
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      console.log('Profile data before update:', profileData);
      const updatedUser = await userService.updateUserProfile(user.id, profileData); // Pass user.id correctly
      login(updatedUser);
      setProfileModal(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountData({ ...accountData, [name]: value });
  };

  const handleAddAccount = async (e) => {
    e.preventDefault();
    const newAccount = {
      userId: user.id,
      name: accountData.name,
      type: accountData.type,
      initialBalance: parseFloat(accountData.initialBalance),
      currency: accountData.currency,
      bank: accountData.bank
    };
    try {
      await accountService.addAccount(newAccount);
      setAccounts([...accounts, newAccount]);
      setAccountData({});
      setEditModal(false);
    } catch (error) {
      console.error('Error adding account:', error);
    }
  };

  const handleDeleteAccount = async (id) => {
    try {
      await accountService.deleteAccount(id);
      setAccounts(accounts.filter(account => account.id !== id));
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleEditAccount = (account) => {
    setAccountData(account);
    setEditModal(true);
  };

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    try {
      await accountService.updateAccount(accountData.id, accountData);
      setAccounts(accounts.map(account => account.id === accountData.id ? accountData : account));
      setEditModal(false);
      setAccountData({});
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Configuración</h2>
      <Tabs defaultActiveKey="user" id="settings-tabs">
        <Tab eventKey="user" title="Información Personal">
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Información Personal</h5>
              <p>Nombre de Usuario: {user?.username}</p>
              <p>Email: {user?.email}</p>
              <p>Nombre: {profileData.firstName}</p>
              <p>Apellido: {profileData.lastName}</p>
              <p>Teléfono: {profileData.phone}</p>
              <p>Género: {profileData.gender}</p>
              <p>Fecha de Nacimiento: {profileData.birthday}</p>
              {profileData.profileImage && (
                <p>
                  <img src={`${process.env.REACT_APP_API_URL}/uploads/profileImages/${profileData.profileImage}`} alt="Perfil" style={{ width: '100px', height: '100px' }} />
                </p>
              )}
              <Button variant="primary" onClick={() => setProfileModal(true)}>Actualizar Información</Button>
            </div>
          </div>
        </Tab>
        <Tab eventKey="accounts" title="Cuentas">
          <AccountList
            accounts={accounts}
            handleEditAccount={handleEditAccount}
            handleDeleteAccount={handleDeleteAccount}
            handleShowAddAccountModal={() => setEditModal(true)}
          />
        </Tab>
      </Tabs>

      <ProfileForm
        profileData={profileData}
        show={profileModal}
        handleClose={() => setProfileModal(false)}
        handleProfileChange={handleProfileChange}
        handleUpdateProfile={handleUpdateProfile}
      />

      <AccountForm
        show={editModal}
        handleClose={() => setEditModal(false)}
        accountData={accountData}
        handleAccountChange={handleAccountChange}
        handleSubmit={accountData.id ? handleUpdateAccount : handleAddAccount}
      />
    </div>
  );
};

export default Settings;
