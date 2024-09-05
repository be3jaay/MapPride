import { FaUserCheck } from 'react-icons/fa';
import PrimaryButton from '../../PrimaryButton';
import { ToastContainer } from 'react-toastify';
import Modal from '../../Modal';
import DangerButton from '@/Components/DangerButton';
import axios from 'axios';
import { useToastNotifications } from '../../../../core/hooks';

const AdminModalExperience = ({ experience, isOpen, onClose, onStatusChange }) => {
  const { notifySuccess, notifyError } = useToastNotifications();

  if (!experience) return null;

  const handleApprove = async () => {
    try {
      await axios.put(`/api/experience/${experience.id}/approve`);
      onStatusChange(experience.id, 'Approved');
      notifySuccess('Experience approved successfully');
      onClose();
    } catch (error) {
      notifyError('Error approving experience');
      console.error('Error approving experience:', error);
    }
  };

  const handleDecline = async () => {
    try {
      await axios.put(`/api/experience/${experience.id}/decline`);
      onStatusChange(experience.id, 'Declined');
      notifySuccess('Experience declined successfully');
      onClose();
    } catch (error) {
      notifyError('Error declining experience');
      console.error('Error declining experience:', error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal show={isOpen} onClose={onClose}>
        <div className="modal-box bg-indigo-200 w-[32rem] p-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-3xl font-bold text-indigo-800">{experience.location}</h3>
              <p className="bg-indigo-500 rounded-full text-white px-4 py-2">{experience.experience_type}</p>
            </div>
            <h3 className="text-2xl font-bold text-black">{experience.title}:</h3>
            <p className="text-md text-black text-justify">{experience.description}</p>
            <div className="mt-2">
              <p className="text-gray-600 text-xl">
                Posted by:
                <span className="font-bold text-black underline text-xl">{experience.username}</span>
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <PrimaryButton
              onClick={handleApprove}
              className="flex items-center justify-center py-2 text-white bg-green-600"
            >
              <FaUserCheck /> Approve
            </PrimaryButton>
            <DangerButton
              onClick={handleDecline}
              className="flex items-center justify-center py-2 text-white bg-red-600"
            >
              Decline
            </DangerButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdminModalExperience;
