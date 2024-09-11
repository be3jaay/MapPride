import Modal from '@/Components/Modal';
import PrimaryButton from '../PrimaryButton';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { trainingTabSchema } from '../../../core/schema';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import GhostButton from '../GhostButton';
import { useToastNotifications } from '../../../core/hooks';
import InputError from '../InputError';

export const AdminTrainingTabs = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { notifySuccess, notifyError } = useToastNotifications();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    reset();
  };

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(trainingTabSchema),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = async data => {
    try {
      await axios.post('/api/training-tabs', data);
      reset();
      notifySuccess('Tabs created successfully.');
    } catch (error) {
      notifyError('Tabs was not created successfully.');
    }
  };

  return (
    <>
      <ToastContainer />
      <GhostButton onClick={handleOpen}>Create Trainings Tab</GhostButton>

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
            <h3 className="font-bold text-3xl text-indigo-800 ">Create a tab for training platform.</h3>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Title
              <input
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Type your anonymous name here.."
                {...register('tabs_title')}
              />
            </label>
            <InputError message={errors.tabs_title?.message} />
            <button className="btn btn-primary w-full text-white mt-2" type="submit">
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};
