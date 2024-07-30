import { FaUserCheck } from 'react-icons/fa';
import PrimaryButton from '../PrimaryButton';
import { ToastContainer, toast } from 'react-toastify';
import SecondaryButton from '../SecondaryButton';
import Modal from '../Modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resourcesForumSchema } from '../../../core/schema';
import axios from 'axios';
import { useEffect } from 'react';

export const AdminEditResources = ({ resource, isOpen, onClose }) => {
  if (!resource) return null;

  const notifySuccess = () => toast.success('Training content updated successfully.');
  const notifyError = () => toast.error('There was an error updating the training content.');

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(resourcesForumSchema),
    defaultValues: {
      tabs_title: resource.tabs_title,
      title: resource.title,
      description: resource.description,
      url_link: resource.url_link,
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
      const response = await axios.put(`/api/resources/${resource.id}`, data);
      console.log('API response:', response);
      reset();
      notifySuccess();
      onClose();
    } catch (error) {
      console.error('API error:', error);
      notifyError();
    }
  };

  const handleDecline = () => {
    onClose();
  };

  useEffect(() => {
    reset({
      tabs_title: resource.tabs_title,
      title: resource.title,
      description: resource.description,
      url_link: resource.url_link,
    });
  }, [resource, reset]);

  return (
    <>
      <ToastContainer />
      <Modal show={isOpen} onClose={onClose}>
        <div className="modal-box bg-indigo-200 w-[60rem] p-12">
          <div className="">
            <h2 className="text-black text-2xl">Edit Training: {resource.title}</h2>
          </div>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <div className="my-4">
              <label className="block text-black font-bold mb-2">Tab Title</label>
              <input
                type="text"
                className="input w-full bg-white border border-gray-300 p-2 text-black"
                {...register('tabs_title')}
              />
            </div>
            <div className="my-4">
              <label className="block text-black font-bold mb-2">Title</label>
              <input
                type="text"
                className="input w-full bg-white border border-gray-300 p-2 text-black"
                {...register('title')}
              />
            </div>
            <div className="my-4">
              <label className="block text-black font-bold mb-2">Description</label>
              <textarea
                className="textarea w-full bg-white border border-gray-300 p-2 text-black"
                {...register('description')}
              ></textarea>
            </div>
            <div className="my-4">
              <label className="block text-black font-bold mb-2">Link</label>
              <input
                type="text"
                className="input w-full bg-white border border-gray-300 p-2 text-black"
                {...register('url_link')}
              />
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <PrimaryButton
                className="flex items-center justify-center py-2 text-white bg-green-600"
                disabled={isSubmitting}
                type="submit"
              >
                <FaUserCheck /> Update
              </PrimaryButton>
              <SecondaryButton
                onClick={handleDecline}
                className="flex bg-transparent items-center justify-center py-2 text-white border border-gray-300"
              >
                Close
              </SecondaryButton>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
