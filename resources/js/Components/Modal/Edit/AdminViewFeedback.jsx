import { FaUserCheck } from 'react-icons/fa';
import PrimaryButton from '../../PrimaryButton';
import { ToastContainer } from 'react-toastify';
import SecondaryButton from '../../SecondaryButton';
import Modal from '../../Modal';
import { useToastNotifications } from '../../../../core/hooks';

const AdminViewFeedback = ({ feedback, isOpen, onClose }) => {
  if (!feedback) return null;

  const { notifySuccess } = useToastNotifications();

  const handleFix = async feedback => {
    await axios.delete(`/api/feedback/${feedback.id}`, feedback);
    notifySuccess('The content was successfully fixed.');
  };

  const handleDecline = () => {
    onClose();
  };

  return (
    <>
      <ToastContainer />
      <Modal show={isOpen} onClose={onClose}>
        <div className="modal-box bg-indigo-200 w-[32rem] p-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-3xl font-bold text-indigo-800">{feedback.feedback_value} stars</h3>
            </div>
            <h3 className="text-2xl font-bold text-black">{feedback.created_at}</h3>
            <p className="text-md text-black text-justify">{feedback.description}</p>
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <PrimaryButton
              onClick={() => handleFix(feedback)}
              className="flex items-center justify-center py-4 text-white bg-green-600"
            >
              <FaUserCheck /> <span className="ml-2">Fixed</span>
            </PrimaryButton>
            <SecondaryButton onClick={handleDecline}>Close</SecondaryButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdminViewFeedback;
