import PrimaryButton from '../../PrimaryButton';
import { ToastContainer, toast } from 'react-toastify';
import Modal from '../../Modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { hotlineSchema } from '../../../../core/schema';
import axios from 'axios';
import { useEffect } from 'react';
import { useToastNotifications } from 'resources/core/hooks';

export const AdminEditHotline = ({ hotline, isOpen, onClose }) => {
  if (!hotline) return null;

  const { notifySuccess, notifyError } = useToastNotifications();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(hotlineSchema),
    defaultValues: {
      title: hotline.title,
      description: hotline.description,
      phoneNumber: hotline.phoneNumber,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const handleUpdate = async data => {
    try {
      await axios.put(`/api/hotlines/${hotline.id}`, data);
      reset();
      notifySuccess('Hotline content updated successfully.');
      onClose();
    } catch (error) {
      notifyError('There was an error updating the hotline content.');
    }
  };

  useEffect(() => {
    reset({
      title: hotline.title,
      description: hotline.description,
      phoneNumber: hotline.phoneNumber,
    });
  }, [hotline, reset]);

  return (
    <>
      <ToastContainer />
      <Modal show={isOpen} onClose={onClose}>
        <div className="modal-box bg-indigo-200 w-[60rem] p-12">
          <form onSubmit={handleSubmit(handleUpdate)}>
            <div className="my-4">
              <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
                Title
                <input
                  type="text"
                  className="input w-full bg-transparent my-2"
                  placeholder="Title here..."
                  {...register('title')}
                />
              </label>
            </div>
            <textarea
              placeholder="Share your story here..."
              className="textarea border-black w-full h-64 bg-white font-bold text-black"
              {...register('description')}
            ></textarea>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Phone
              <input
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Phone number here.."
                {...register('phoneNumber')}
              />
            </label>
            <div className="flex justify-end mt-4 gap-2">
              <PrimaryButton
                className="flex items-center justify-center py-4 text-white bg-green-600"
                disabled={isSubmitting}
                type="submit"
              >
                Update
              </PrimaryButton>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
