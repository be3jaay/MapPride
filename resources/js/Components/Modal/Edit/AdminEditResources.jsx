import PrimaryButton from '../../PrimaryButton';
import { ToastContainer } from 'react-toastify';
import Modal from '../../Modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resourcesForumSchema } from '../../../../core/schema';
import axios from 'axios';
import { useEffect } from 'react';
import { useToastNotifications } from '../../../../core/hooks';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const AdminEditResources = ({ resources, isOpen, onClose }) => {
  if (!resources) return null;

  const { notifyError, notifySuccess } = useToastNotifications();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(resourcesForumSchema),
    defaultValues: {
      tabs_title: resources.tabs_title,
      title: resources.title,
      description: resources.description,
      url_link: resources.url_link,
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
      await axios.put(`/api/resources/${resources.id}`, data);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Resource content updated successfully.',
      });
      reset();
      onClose();
    } catch (error) {
      notifyError('There was an error updating the training content.');
    }
  };

  useEffect(() => {
    reset({
      tabs_title: resources.tabs_title,
      title: resources.title,
      description: resources.description,
      url_link: resources.url_link,
    });
  }, [resources, reset]);

  return (
    <>
      <ToastContainer />
      <Modal show={isOpen} onClose={onClose}>
        <div className="modal-box bg-indigo-200 w-[60rem] p-12">
          <div className="">
            <h2 className="text-black text-2xl">Edit Training: {resources.tabs_title}</h2>
          </div>
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
            <div className="my-4">
              <textarea
                placeholder="Description here..."
                className="textarea border-black w-full h-64 bg-white font-bold text-black"
                {...register('description')}
              ></textarea>
            </div>
            <div className="my-4">
              <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
                Link
                <input
                  type="text"
                  className="input w-full bg-transparent my-2"
                  placeholder="Link here"
                  {...register('url_link')}
                />
              </label>
            </div>
            <div className="flex justify-end mt-4 gap-2 w-full">
              <PrimaryButton
                className="w-full flex items-center justify-center py-4 text-white bg-green-600"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? 'Submitting' : 'Submit'}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
