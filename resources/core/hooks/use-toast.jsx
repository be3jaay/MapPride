import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useToastNotifications = () => {
  const notifySuccess = message => toast.success(message);
  const notifyError = message => toast.error(message);

  return { notifySuccess, notifyError };
};
