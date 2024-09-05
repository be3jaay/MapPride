import Modal from '@/Components/Modal';
import PrimaryButton from '../../PrimaryButton';
import { MdForum } from 'react-icons/md';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { forumSchema } from '../../../../core/schema';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useToastNotifications } from '../../../../core/hooks';
import useModal from '../../../../core/hooks/use-modal';

export const ForumModal = () => {
  const { handleOpen, isOpen, closeModal } = useModal();
  const { notifyError, notifySuccess } = useToastNotifications();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(forumSchema),
  });

  const { register, handleSubmit, reset, control } = form;

  const onSubmit = async data => {
    try {
      await axios.post('/api/experience', data);
      reset();
      notifySuccess('Your experience has been posted, thank you.');
    } catch (error) {
      notifyError('There was an error posting your experience.');
    }
  };

  return (
    <>
      <ToastContainer />
      <PrimaryButton onClick={handleOpen}>
        Share Experience <MdForum />
      </PrimaryButton>

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
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Username
              <input
                control={control}
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Type your anonymous name here.."
                {...register('username')}
              />
            </label>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Title
              <input
                control={control}
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Type your anonymous name here.."
                {...register('title')}
              />
            </label>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Experience
              <input
                control={control}
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="What type of experience (e.g., Harassment)"
                {...register('experience_type')}
              />
            </label>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Location
              <input
                control={control}
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Where did the experience happen..."
                {...register('location')}
              />
            </label>
            <textarea
              control={control}
              placeholder="Share your story here..."
              className="textarea border-black w-full h-64 bg-white font-bold text-black"
              {...register('description')}
            ></textarea>
            <button className="btn btn-primary w-full text-white mt-2" type="submit">
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};
