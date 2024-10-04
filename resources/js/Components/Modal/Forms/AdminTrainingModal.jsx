import Modal from '@/Components/Modal';
import PrimaryButton from '../../PrimaryButton';
import { MdForum } from 'react-icons/md';
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { trainingSchema } from '../../../../core/schema';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import useModal from '../../../../core/hooks/use-modal';
import { useToastNotifications } from '../../../../core/hooks';
import InputError from '@/Components/InputError';
import { TextField } from '@/Components/TextField';

const TrainingForms = ({ handleSubmit, onSubmit, tabs, processing, register, errors, isSubmitting }) => {
  return (
    <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="font-bold text-2xl text-indigo-800 text-center">
        This modal is used to create training content .
      </h3>
      <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
        Tab
        <select className="select w-full bg-white text-black font-bold my-4" {...register('tabs_title')}>
          {tabs.map(title => (
            <option key={title.id} value={title}>
              {title}
            </option>
          ))}
        </select>
      </label>
      <InputError message={errors.tabs_title?.message} />
      <TextField label="Title" placeholder="Type your title here..." register={register} name="title" errors={errors} />
      <textarea
        placeholder="Enter description here..."
        className="textarea border-black w-full h-64 bg-white font-bold text-black"
        {...register('description')}
      ></textarea>
      <InputError message={errors.description?.message} />
      <TextField label="Link" placeholder="Paste the url link..." register={register} name="url_link" errors={errors} />
      <TextField label="Credits" placeholder="Credits to owner..." register={register} name="credits" errors={errors} />
      <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
        Certificate
        <select className="select w-full bg-white text-black font-bold my-4" {...register('certificate')}>
          <option value={1}>Have Free Certificate</option>
          <option value={0}>Have No Free Certificate</option>
        </select>
      </label>
      <PrimaryButton className="w-full justify-center py-4" disabled={processing}>
        {isSubmitting ? 'Submitting' : 'Submit'}
      </PrimaryButton>
    </form>
  );
};
export const AdminTrainingModal = () => {
  const [tabs, setTabs] = useState([]);

  const { handleOpen, isOpen, closeModal } = useModal();
  const { notifyError, notifySuccess } = useToastNotifications();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(trainingSchema),
    defaultValues: { ...trainingSchema.getDefault() },
  });

  const {
    register,
    handleSubmit,
    reset,
    processing,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = useCallback(
    async data => {
      try {
        await axios.post('/api/training', data);
        notifySuccess('Form submitted successfully!');
        closeModal();
        reset();
      } catch (error) {
        notifyError('Form submission failed!');
        closeModal();
        reset();
      }
    },
    [notifyError, notifySuccess],
  );

  const handleClose = () => {
    reset();
    closeModal();
  };

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const response = await axios.get('/api/training-tabs');
        const tabTitles = response.data.map(tab => tab.tabs_title);
        setTabs(tabTitles);
      } catch (error) {
        console.error('Error fetching tabs:', error);
      }
    };
    fetchTabs();
  }, []);

  return (
    <div>
      <ToastContainer />
      <PrimaryButton onClick={handleOpen}>
        Create Training Content <MdForum className="ml-2" />
      </PrimaryButton>
      <Modal show={isOpen} onClose={handleClose}>
        <div className="modal-box bg-indigo-200 p-12 max-w-7xl">
          <TrainingForms
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            processing={processing}
            register={register}
            tabs={tabs}
            isSubmitting={isSubmitting}
          />
        </div>
      </Modal>
    </div>
  );
};
