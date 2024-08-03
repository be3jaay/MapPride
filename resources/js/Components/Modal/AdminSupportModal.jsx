import Modal from '@/Components/Modal';
import PrimaryButton from '../PrimaryButton';
import { MdForum } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resourcesForumSchema, supportSchema } from '../../../core/schema';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const AdminSupportModal = () => {
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
    resolver: yupResolver(supportSchema),
    defaultValues: supportSchema.getDefault(),
  });

  const { register, handleSubmit, reset, processing } = form;

  const onSubmit = async data => {
    try {
      const response = await axios.post('/api/support', data);
      console.log('API response:', response);
      reset();
      notifySuccess();
    } catch (error) {
      console.error('API error:', error);
      notifyError();
    }
  };

  return (
    <>
      <ToastContainer />
      <PrimaryButton onClick={handleOpen}>
        Create Training Content <MdForum className="ml-2" />
      </PrimaryButton>
      <Modal show={isOpen} onClose={closeModal}>
        <div className="modal-box bg-indigo-200 p-12 max-w-7xl">
          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-2xl text-indigo-800 text-center">
              This modal is used to create training content for users.
            </h3>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Title
              <input
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Title"
                {...register('title')}
              />
            </label>
            <textarea
              placeholder="Enter description here..."
              className="textarea border-black w-full h-64 bg-white font-bold text-black"
              {...register('description')}
            ></textarea>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Phone
              <input
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Paste the url link"
                {...register('phoneNumber')}
              />
            </label>
            <PrimaryButton className="w-full justify-center py-4" disabled={processing} type="submit">
              Submit
            </PrimaryButton>
          </form>
        </div>
      </Modal>
    </>
  );
};
