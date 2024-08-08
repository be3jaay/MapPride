import { useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    handleOpen,
    closeModal,
    isOpen,
  };
};

export default useModal;
