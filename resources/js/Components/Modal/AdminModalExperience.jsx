import { FaUserCheck } from 'react-icons/fa';
import PrimaryButton from '../PrimaryButton';
import { ToastContainer } from 'react-toastify';
import SecondaryButton from '../SecondaryButton';
import Modal from '../Modal';

const AdminModalExperience = ({ experience, isOpen, onClose }) => {
  if (!experience) return null;

  const handleApprove = () => {
    onClose();
  };

  const handleDecline = () => {
    onClose();
  };

  return (
    <>
      <ToastContainer />
      <Modal show={isOpen} onClose={onClose}>
        <div className="modal-box bg-indigo-200 max-w-7xl p-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-3xl font-bold text-indigo-800">{experience.location}</h3>
              <p className="bg-indigo-500 rounded-full text-white px-4 py-2">{experience.experience_type}</p>
            </div>
            <h3 className="text-2xl font-bold text-black">{experience.title}:</h3>
            <p className="text-md text-black text-justify max-h-full overflow-y-auto">{experience.description}</p>
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
            <SecondaryButton
              onClick={handleDecline}
              className="flex bg-transparent items-center justify-center py-2 text-white border border-gray-300"
            >
              Decline
            </SecondaryButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdminModalExperience;
