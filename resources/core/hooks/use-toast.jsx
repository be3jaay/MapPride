import { toast } from 'react-toastify';

export const useToastNotifications = () => {
  const notifySuccess = message => toast.success(message);
  const notifyError = message => toast.error(message);

  return { notifySuccess, notifyError };
};
