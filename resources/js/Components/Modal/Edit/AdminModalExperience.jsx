import { FaUserCheck } from 'react-icons/fa';
import PrimaryButton from '../../PrimaryButton';
import { ToastContainer } from 'react-toastify';
import Modal from '../../Modal';
import DangerButton from '@/Components/DangerButton';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const AdminModalExperience = ({ experience, isOpen, onClose }) => {
  if (!experience) return null;

  const handleApprove = async () => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Approve Content',
      cancelButtonText: 'No, cancel!',
    });
    if (result.isConfirmed) {
      await axios.put(`/api/experience/${experience.id}/approve`);
      onClose();
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Story content approved successfully.',
      });
    }
  };
  const handleDelete = async data => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Reject Content',
      cancelButtonText: 'No, cancel!',
    });
    if (result.isConfirmed) {
      await axios.delete(`/api/experience/${experience.id}`, data);
      onClose();
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Story content rejected successfully.',
      });
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
          {experience.approved ? (
            <div className="flex justify-end mt-4 gap-2">
              <DangerButton
                onClick={() => {
                  handleDelete(experience);
                }}
                className="flex items-center justify-center py-2 text-white bg-red-600"
              >
                Delete
              </DangerButton>
            </div>
          ) : (
            <div className="flex justify-end mt-4 gap-2 ">
              <DangerButton
                onClick={() => {
                  handleDelete(experience);
                }}
                className="flex items-center justify-center  py-4 px-6 text-white bg-red-600"
              >
                Decline
              </DangerButton>
              <PrimaryButton
                onClick={() => {
                  handleApprove();
                }}
                className="flex items-center justify-center py-4 px-6 text-white bg-green-600"
              >
                <FaUserCheck className="mr-2" /> Approve
              </PrimaryButton>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default AdminModalExperience;
