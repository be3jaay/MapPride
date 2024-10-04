import PrimaryButton from '../../PrimaryButton';
import Modal from '../../Modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { supportSchema } from '../../../../core/schema';
import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useToastNotifications } from '../../../../core/hooks';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { TextField } from '@/Components/TextField';

const MySwal = withReactContent(Swal);

const EditSupportForms = ({ handleSubmit, handleUpdate, register, errors, isSubmitting }) => {
  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <TextField label="Title" placeholder="Type your title here..." register={register} name="title" errors={errors} />
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
      <PrimaryButton
        className="flex items-center  w-full justify-center py-4 text-white "
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? 'Updating...' : 'Submit'}
      </PrimaryButton>
    </form>
  );
};

export const AdminEditSupport = ({ support, isOpen, onClose }) => {
  if (!support) return null;

  const { notifyError } = useToastNotifications();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(supportSchema),
    defaultValues: { ...supportSchema.getDefault() },
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
    },
    [notifyError],
  );

  useEffect(() => {
    reset({
      title: support.title,
      description: support.description,
      phoneNumber: support.phoneNumber,
    });
  }, [support, reset]);

  return (
    <Modal show={isOpen} onClose={onClose}>
      <div className="modal-box bg-indigo-200 w-[60rem] p-12">
        <EditSupportForms
          errors={errors}
          handleSubmit={handleSubmit}
          handleUpdate={handleUpdate}
          isSubmitting={isSubmitting}
          register={register}
        />
      </div>
    </Modal>
  );
};
