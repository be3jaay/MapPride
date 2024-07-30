import Modal from '@/Components/Modal';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { tabSchema } from '../../../core/schema';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import GhostButton from '../GhostButton';

export const AdminCreateTabs = () => {
  const [isOpen, setIsOpen] = useState(false);

  const notifySuccess = () => toast.success('Your experience has been posted, thank you.');
  const notifyError = () => toast.error('There was an error posting your experience.');

  const handleOpen = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    reset();
  };

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(tabSchema),
  });

  const { register, handleSubmit, reset } = form;

  const onSubmit = async data => {
    try {
      await axios.post('/api/tabs', data);
      reset();
      notifySuccess();
    } catch (error) {
      notifyError();
    }
  };

  return (
    <>
      <ToastContainer />
<<<<<<< Updated upstream:resources/js/Components/Modal/AdminCreateTabs.jsx
      <PrimaryButton onClick={handleOpen}>Create Tabs</PrimaryButton>

=======
      <GhostButton onClick={handleOpen}>Create Resources Tab</GhostButton>
>>>>>>> Stashed changes:resources/js/Components/Tabs/AdminCreateTabs.jsx
      <Modal show={isOpen} onClose={closeModal}>
        <div className="modal-box bg-indigo-200 max-w-7xl p-12">
          <form onSubmit={handleSubmit(onSubmit)}>
            <button
              className="btn btn-md text-black btn-circle btn-ghost absolute right-2 top-2"
              type="button"
              onClick={closeModal}
            >
              ✕
            </button>
            <h3 className="font-bold text-2xl text-indigo-800">
              How are you? This is a freedom wall, feel free to share your experience here.
            </h3>
            <select
              className="select select-bordered w-full bg-white border-black text-black font-bold my-4"
              {...register('tabs_type')}
            >
              <option disabled selected>
                Create a tab for...
              </option>
              <option>Resources</option>
              <option>Training</option>
            </select>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Title
              <input
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Type your anonymous name here.."
                {...register('tabs_title')}
              />
            </label>
            <button className="btn btn-primary w-full text-white mt-2" type="submit">
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};
