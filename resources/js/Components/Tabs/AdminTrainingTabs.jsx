import Modal from '@/Components/Modal';
import PrimaryButton from '../PrimaryButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { trainingTabSchema } from '../../../core/schema';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import GhostButton from '../GhostButton';
import InputError from '../InputError';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useModal from '../../../core/hooks/use-modal';
import { useCallback } from 'react';

const MySwal = withReactContent(Swal);

const TrainingTabsForm = ({ handleSubmit, onSubmit, closeModal, errors, register, isSubmitting }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button
        className="btn btn-md text-black btn-circle btn-ghost absolute right-2 top-2"
        type="button"
        onClick={closeModal}
      >
        ✕
      </button>
      <h3 className="font-bold text-3xl text-indigo-800 ">Create a tab for training platform.</h3>
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
export const AdminTrainingTabs = () => {
  const { handleOpen, isOpen, closeModal } = useModal();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(trainingTabSchema),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = useCallback(async data => {
    try {
      await axios.post('/api/training-tabs', data);
      reset();
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Tabs created successfully.',
      });
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'error',
        text: 'Tabs was not created successfully.',
      });
    }
  }, []);

  return (
    <div>
      <GhostButton onClick={handleOpen}>Create Trainings Tab</GhostButton>
      <Modal show={isOpen} onClose={closeModal}>
        <div className="modal-box bg-indigo-200 max-w-7xl p-12">
          <TrainingTabsForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            closeModal={closeModal}
            errors={errors}
            register={register}
            isSubmitting={isSubmitting}
          />
        </div>
      </Modal>
    </div>
  );
};
