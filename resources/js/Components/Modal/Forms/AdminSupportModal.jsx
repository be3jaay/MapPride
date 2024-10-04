import Modal from '@/Components/Modal';
import PrimaryButton from '../../PrimaryButton';
import { MdForum } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { supportSchema } from '../../../../core/schema';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import useModal from '../../../../core/hooks/use-modal';
import InputError from '@/Components/InputError';
import { TextField } from '@/Components/TextField';
import { useCallback } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const AdminSupportForm = ({ handleSubmit, onSubmit, register, errors, isSubmitting, processing }) => {
  return (
    <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="font-bold text-2xl text-indigo-800 text-center">
        This modal is used to create support content for users.
      </h3>
      <TextField label="Title" placeholder="Type your title here..." register={register} name="title" errors={errors} />
      <textarea
        placeholder="Enter description here..."
        className="textarea border-black w-full h-64 bg-white font-bold text-black"
        {...register('description')}
      ></textarea>
      <InputError message={errors.description?.message} />
      <TextField
        label="Phone"
        placeholder="Phone number here..."
        register={register}
        name="phoneNumber"
        errors={errors}
      />
      <PrimaryButton className="w-full justify-center py-4" disabled={processing} type="submit">
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </PrimaryButton>
    </form>
  );
};
export const AdminSupportModal = () => {
  const { handleOpen, isOpen, closeModal } = useModal();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(supportSchema),
    defaultValues: { ...supportSchema.getDefault() },
  });

  const {
    register,
    handleSubmit,
    reset,
    processing,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = useCallback(async data => {
    try {
      await axios.post('/api/support', data);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your support content has been added, thank you.',
      });
      reset();
      closeModal();
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'error',
        text: 'There was an error posting your support content',
      });
    }
  }, []);

  const handleClose = useCallback(() => {
    reset();
    closeModal();
  }, [reset, closeModal]);

  return (
    <div>
      <PrimaryButton onClick={handleOpen}>
        Create Support Content <MdForum className="ml-2" />
      </PrimaryButton>
      <Modal show={isOpen} onClose={handleClose}>
        <div className="modal-box bg-indigo-200 p-12 max-w-7xl">
          <AdminSupportForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            processing={processing}
          />
        </div>
      </Modal>
    </div>
  );
};
