import React, { createContext, useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const ToastContextValue = createContext();

export const useToastMessage = () => {
  if (!ToastContextValue) {
    throw new Error('ToastContextValue is not defined.');
  }
  return useContext(ToastContextValue);
};

export const ToastValueProvider = ({ children }) => {
  const toastMesage = () => {
    toast(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      ...options,
    });
  };
  return (
    <ToastContextValue.Provider>
      value={{ toastMesage }}
      {children}
    </ToastContextValue.Provider>
  );
};
