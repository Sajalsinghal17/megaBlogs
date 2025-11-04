import React from 'react';
import { useDispatch } from 'react-redux';
import { FiLogOut } from 'react-icons/fi';
import { logout } from '../../store/authSlice';
import authService from '../../appwrite/auth';

function LogoutBtn({ mobile }) {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      onClick={logoutHandler}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-white bg-red-500 hover:bg-red-600 transition font-medium ${
        mobile ? 'w-full justify-center' : ''
      }`}
    >
      <FiLogOut />
      Logout
    </button>
  );
}

export default LogoutBtn;
