import Modal from '@/Components/Modal';
import PrimaryButton from '../PrimaryButton';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { tabSchema } from '../../../core/schema';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import GhostButton from '../GhostButton';
import InputError from '../InputError';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useModal from '../../../core/hooks/use-modal';

const MySwal = withReactContent(Swal);

const TabForms = ({ handleSubmit, onSubmit, closeModal, register, isSubmitting, errors }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button
        className="btn btn-md text-black btn-circle btn-ghost absolute right-2 top-2"
        type="button"
        onClick={closeModal}
      >
        ✕
      </button>
      <h3 className="font-bold text-2xl text-indigo-800">Create a resources tab</h3>
      <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
        Title
        <input
          type="text"
          className="input w-full bg-transparent my-2"
          placeholder="Type your anonymous name here.."
          {...register('tabs_title')}
        />
      </label>
      <InputError message={errors.tabs_title?.message} />
      <PrimaryButton className="w-full justify-center py-4" disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : 'Submit'}
      </PrimaryButton>
    </form>
  );
};
export const AdminCreateTabs = () => {
  const { handleOpen, isOpen, closeModal } = useModal();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(tabSchema),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = useCallback(async data => {
    try {
      await axios.post('/api/tabs', data);
      reset();
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Tab submitted successfully.',
      });
    } catch (error) {
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Tabs was not created successfully.',
      });
    }
  });

  return (
    <div>
      <GhostButton onClick={handleOpen}>Create Resources Tab</GhostButton>
      <Modal show={isOpen} onClose={closeModal}>
        <div className="modal-box bg-indigo-200 w-[40rem] p-12">
          <TabForms
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            closeModal={closeModal}
            register={register}
            isSubmitting={isSubmitting}
            errors={errors}
          />
        </div>
      </Modal>
    </div>
  );
};
