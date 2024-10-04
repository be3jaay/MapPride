import Modal from '@/Components/Modal';
import PrimaryButton from '../../PrimaryButton';
import { MdForum } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { forumSchema } from '../../../../core/schema';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useToastNotifications } from '../../../../core/hooks';
import useModal from '../../../../core/hooks/use-modal';
import InputError from '@/Components/InputError';
import { TextField } from '@/Components/TextField';
import SelectInput from '@/Components/SelectField';

export const ForumModal = () => {
  const { handleOpen, isOpen, closeModal } = useModal();
  const { notifyError, notifySuccess } = useToastNotifications();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(forumSchema),
    defaultValues: { ...forumSchema.getDefault() },
  });

  const {
    processing,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async data => {
    try {
      await axios.post('/api/experience', data);
      reset();
      closeModal();
      notifySuccess('Your experience has been posted, thank you.');
    } catch (error) {
      notifyError('There was an error posting your experience.');
    }
  };

  const handleClose = () => {
    reset();
    closeModal();
  };

  const experienceOptions = [
    'Harassment',
    'Discrimination',
    'Bullying',
    'Verbal Abuse',
    'Physical Assault',
    'Sexual Harassment',
    'Exclusion from Services',
    'Hate Speech',
    'Cyberbullying',
    'Family Rejection',
    'Workplace Discrimination',
    'Housing Discrimination',
    'Medical Misinformation',
  ];

  return (
    <>
      <ToastContainer />
      <PrimaryButton onClick={handleOpen} className="py-4 px-6">
        Share Story <MdForum className="ml-2" />
      </PrimaryButton>

      <Modal show={isOpen} onClose={handleClose}>
        <div className="modal-box bg-indigo-200 max-w-7xl p-12">
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
            <TextField
              label="Title"
              placeholder="Type your title here..."
              register={register}
              name="title"
              errors={errors}
            />
            <SelectInput
              label="Experience"
              name="experience_type"
              options={experienceOptions}
              register={register}
              errors={errors}
              setValue={setValue}
            />
            <TextField
              label="Location"
              placeholder="Where did the experience happen..."
              register={register}
              name="location"
              errors={errors}
            />
            <textarea
              placeholder="Share your story here..."
              className="textarea border-black w-full h-64 bg-white font-bold text-black"
              {...register('description')}
            ></textarea>
            <InputError message={errors.description?.message} />
            <PrimaryButton className="w-full py-4 justify-center" disabled={processing}>
              {isSubmitting ? 'Submitting' : 'Submit'}
            </PrimaryButton>
          </form>
        </div>
      </Modal>
    </>
  );
};
