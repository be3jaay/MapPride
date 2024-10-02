import PrimaryButton from '../../PrimaryButton';
import { ToastContainer } from 'react-toastify';
import Modal from '../../Modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { supportSchema } from '../../../../core/schema';
import axios from 'axios';
import { useEffect } from 'react';
import { useToastNotifications } from '../../../../core/hooks';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const AdminEditSupport = ({ support, isOpen, onClose }) => {
  if (!support) return null;

  const { notifyError } = useToastNotifications();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(supportSchema),
    defaultValues: {
      title: support.title,
      description: support.description,
      phoneNumber: support.phoneNumber,
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
      await axios.put(`/api/support/${support.id}`, data);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Support content updated successfully.',
      });
      reset();
      onClose();
    } catch (error) {
      notifyError('There was an error updating the support content.');
    }
  };

  useEffect(() => {
    reset({
      title: support.title,
      description: support.description,
      phoneNumber: support.phoneNumber,
    });
  }, [support, reset]);

  return (
    <>
      <ToastContainer />
      <Modal show={isOpen} onClose={onClose}>
        <div className="modal-box bg-indigo-200 w-[60rem] p-12">
          <form onSubmit={handleSubmit(handleUpdate)}>
            <div className="my-4">
              <span className="text-lg text-black">Title: </span>
              <input
                type="text"
                className="input w-full bg-white text-black my-2"
                placeholder="Title here..."
                {...register('title')}
              />
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
            <PrimaryButton
              className="flex items-center  w-full justify-center py-4 text-white "
              disabled={isSubmitting}
              type="submit"
            >
              Update
            </PrimaryButton>
          </form>
        </div>
      </Modal>
    </>
  );
};
