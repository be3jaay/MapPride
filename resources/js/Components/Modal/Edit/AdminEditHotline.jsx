import PrimaryButton from '../../PrimaryButton';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../../Modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { hotlineSchema } from '../../../../core/schema';
import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useToastNotifications } from '../../../../core/hooks';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { TextField } from '@/Components/TextField';

const MySwal = withReactContent(Swal);

const EditHotlineForm = ({ handleSubmit, handleUpdate, register, errors, isSubmitting }) => {
  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <div className="my-4">
        <TextField
          label="Title"
          placeholder="Type your title here..."
          register={register}
          name="title"
          errors={errors}
        />
      </div>
      <textarea
        placeholder="Share your story here..."
        className="textarea border-black w-full h-64 bg-white font-bold text-black"
        {...register('description')}
      ></textarea>
      <TextField
        label="Phone"
        placeholder="Phone number here..."
        register={register}
        name="phoneNumber"
        errors={errors}
      />
      <div className="flex justify-end mt-4 gap-2">
        <PrimaryButton
          className="flex items-center justify-center py-4 text-white bg-green-600"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? 'Updating' : 'Update'}
        </PrimaryButton>
      </div>
    </form>
  );
};
export const AdminEditHotline = ({ hotline, isOpen, onClose }) => {
  if (!hotline) return null;

  const { notifyError } = useToastNotifications();

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
    formState: { isSubmitting, errors },
  } = form;

  const handleUpdate = useCallback(
    async data => {
      try {
        await axios.put(`/api/hotlines/${hotline.id}`, data);
        MySwal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Support content updated successfully.',
        });
        reset();
        onClose();
      } catch (error) {
        notifyError('There was an error updating the hotline content.');
      }
    },
    [notifyError],
  );

  useEffect(() => {
    reset({
      title: hotline.title,
      description: hotline.description,
      phoneNumber: hotline.phoneNumber,
    });
  }, [hotline, reset]);

  return (
    <div>
      <Modal show={isOpen} onClose={onClose}>
        <div className="modal-box bg-indigo-200 w-[60rem] p-12">
          <EditHotlineForm
            errors={errors}
            handleSubmit={handleSubmit}
            handleUpdate={handleUpdate}
            isSubmitting={isSubmitting}
            register={register}
          />
        </div>
      </Modal>
    </div>
  );
};
