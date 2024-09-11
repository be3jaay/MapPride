import Modal from '@/Components/Modal';
import PrimaryButton from '../../PrimaryButton';
import { MdForum } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { trainingSchema } from '../../../../core/schema';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import useModal from '../../../../core/hooks/use-modal';
import { useToastNotifications } from '../../../../core/hooks';
import InputError from '@/Components/InputError';

export const AdminTrainingModal = () => {
  const [tabs, setTabs] = useState([]);

  const { handleOpen, isOpen, closeModal } = useModal();
  const { notifyError, notifySuccess } = useToastNotifications();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(trainingSchema),
    defaultValues: trainingSchema.getDefault(),
  });

  const {
    register,
    handleSubmit,
    reset,
    processing,
    formState: { errors },
  } = form;

  const onSubmit = async data => {
    try {
      await axios.post('/api/training', data);
      notifySuccess('Your resources has been created, thank you.');
      closeModal();
      reset();
    } catch (error) {
      notifyError('There was an error posting your training.');
    }
  };

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
    <>
      <ToastContainer />
      <PrimaryButton onClick={handleOpen}>
        Create Training Content <MdForum className="ml-2" />
      </PrimaryButton>
      <Modal show={isOpen} onClose={handleClose}>
        <div className="modal-box bg-indigo-200 p-12 max-w-7xl">
          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-2xl text-indigo-800 text-center">
              This modal is used to create training content for users.
            </h3>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Tab
              <select className="select w-full bg-white text-black font-bold my-4" {...register('tabs_title')}>
                {tabs.map((title, index) => (
                  <option key={index} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </label>
            <InputError message={errors.tabs_title?.message} />

            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Title
              <input
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Title"
                {...register('title')}
              />
            </label>

            <InputError message={errors.title?.message} />
            <textarea
              placeholder="Enter description here..."
              className="textarea border-black w-full h-64 bg-white font-bold text-black"
              {...register('description')}
            ></textarea>
            <InputError message={errors.description?.message} />

            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Link
              <input
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Paste the url link"
                {...register('url_link')}
              />
            </label>
            <InputError message={errors.url_link?.message} />

            <PrimaryButton className="w-full justify-center py-4" disabled={processing}>
              Submit
            </PrimaryButton>
          </form>
        </div>
      </Modal>
    </>
  );
};
