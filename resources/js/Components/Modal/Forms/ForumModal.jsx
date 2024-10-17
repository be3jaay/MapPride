import Modal from '@/Components/Modal';
import PrimaryButton from '../../PrimaryButton';
import { MdForum } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { forumSchema } from '../../../../core/schema';
import axios from 'axios';
import useModal from '../../../../core/hooks/use-modal';
import InputError from '@/Components/InputError';
import { TextField } from '@/Components/TextField';
import SelectInput from '@/Components/SelectField';
import { experienceOptions, lagunaLocations } from './ForumOptions';
import { useCallback } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const ForumForm = ({ handleSubmit, closeModal, register, errors, setValue, isSubmitting, onSubmit }) => {
  return (
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
      <TextField
        label="Username"
        placeholder="Type your anonymous name here.."
        register={register}
        name="username"
        errors={errors}
      />
      <TextField label="Title" placeholder="Type your title here..." register={register} name="title" errors={errors} />
      <SelectInput
        label="Experience"
        name="experience_type"
        options={experienceOptions}
        register={register}
        errors={errors}
        setValue={setValue}
      />
      <SelectInput
        label="Location"
        name="location"
        options={lagunaLocations}
        register={register}
        errors={errors}
        setValue={setValue}
      />
      <textarea
        placeholder="Share your story here..."
        className="textarea border-black w-full h-64 bg-white font-bold text-black"
        {...register('description')}
      ></textarea>
      <InputError message={errors.description?.message} />
      <PrimaryButton className="w-full py-4 justify-center" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting' : 'Submit'}
      </PrimaryButton>
    </form>
  );
};
export const ForumModal = () => {
  const { handleOpen, isOpen, closeModal } = useModal();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(forumSchema),
    defaultValues: { ...forumSchema.getDefault() },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = useCallback(async data => {
    try {
      await axios.post('/api/experience', data);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Please wait for the admin to approved your story. Thank You.',
      });
      closeModal();
      reset();
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'error',
        text: 'Content submitted unsuccessfully.',
      });
      closeModal();
      reset();
    }
  }, []);

  const handleClose = useCallback(() => {
    reset();
    closeModal();
  }, [reset, closeModal]);

  return (
    <div>
      <PrimaryButton onClick={handleOpen} className="py-4 px-6">
        Share Story <MdForum className="ml-2" />
      </PrimaryButton>
      <Modal show={isOpen} onClose={handleClose}>
        <div className="modal-box bg-indigo-200 max-w-7xl p-12">
          <ForumForm
            handleSubmit={handleSubmit}
            closeModal={handleClose}
            register={register}
            errors={errors}
            experienceOptions={experienceOptions}
            lagunaLocations={lagunaLocations}
            setValue={setValue}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
          />
        </div>
      </Modal>
    </div>
  );
};
