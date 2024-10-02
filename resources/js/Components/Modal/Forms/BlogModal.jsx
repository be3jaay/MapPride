import Modal from '@/Components/Modal';
import PrimaryButton from '../../PrimaryButton';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useToastNotifications } from '../../../../core/hooks';
import useModal from '../../../../core/hooks/use-modal';
import InputError from '@/Components/InputError';
import React, { useEffect, useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io';

export default function BlogModal({ auth }) {
  const { handleOpen, isOpen, closeModal } = useModal();
  const { notifyError, notifySuccess } = useToastNotifications();

  const form = useForm({
    mode: 'all',
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
    setValue,
  } = form;

  const user = auth.user;

  const [username] = useState(user.name);
  const [icon] = useState(user.profile_picture);

  useEffect(() => {
    setValue('username', username);
    setValue('icon', icon);
  }, [username, icon, setValue]);

  const onSubmit = async data => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('image', data.image[0] || '');
      formData.append('icon', icon);

      await axios.post('/api/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      notifySuccess('Your marker has been created, thank you.');
      closeModal();
      reset();
    } catch (error) {
      console.error('Submission Error:', error);
      notifyError('There was an error posting your map');
    }
  };

  const handleClose = () => {
    reset();
    closeModal();
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <PrimaryButton onClick={handleOpen} className="py-4 px-6 ">
        Add Post <IoMdAddCircle className="text-lg ml-2  " />
      </PrimaryButton>

      <Modal show={isOpen} onClose={handleClose}>
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
              How are you? This is a freedom wall, feel free to share your story here.
            </h3>

            <InputError message={errors.username?.message} />

            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Title
              <input
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Type your title here.."
                {...register('title')}
              />
            </label>
            <InputError message={errors.title?.message} />
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full bg-white"
              {...register('image')}
            />
            <textarea
              placeholder="Blog description here..."
              className="textarea border-black w-full h-64 mt-4  bg-white font-bold text-black"
              {...register('description')}
            ></textarea>
            <InputError message={errors.description?.message} />
            <PrimaryButton className="w-full py-4 justify-center ">
              {isSubmitting ? 'Submitting' : 'Submit'}
            </PrimaryButton>
          </form>
        </div>
      </Modal>
    </React.Fragment>
  );
}
