import Modal from '@/Components/Modal';
import PrimaryButton from '../../PrimaryButton';
import { MdForum } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resourcesForumSchema } from '../../../../core/schema';
import { ToastContainer } from 'react-toastify';
import { useToastNotifications } from '../../../../core/hooks';
import axios from 'axios';
import useModal from '../../../../core/hooks/use-modal';
import InputError from '@/Components/InputError';
import { TextField } from '@/Components/TextField';

export const AdminResourcesModal = () => {
  const [tabs, setTabs] = useState([]);
  const { notifyError, notifySuccess } = useToastNotifications();
  const { handleOpen, isOpen, closeModal } = useModal();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(resourcesForumSchema),
    defaultValues: { ...resourcesForumSchema.getDefault() },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit = async data => {
    try {
      await axios.post('/api/resources', data);
      notifySuccess('Your resources has been created, thank you.');
      closeModal();
      reset();
    } catch (error) {
      notifyError('There was an error posting your experience.');
    }
  };

  const handleClose = () => {
    reset();
    closeModal();
  };

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const response = await axios.get('/api/tabs');
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
        Create Resources Content
        <MdForum className="ml-2" />
      </PrimaryButton>
      <Modal show={isOpen} onClose={handleClose}>
        <div className="modal-box bg-indigo-200 p-12 w-[96rem]">
          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-2xl text-indigo-800">Create Resources Content</h3>
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
            <TextField
              label="Title"
              placeholder="Type your title here..."
              register={register}
              name="title"
              errors={errors}
            />
            <textarea
              placeholder="Enter description here..."
              className="textarea border-black w-full h-64 bg-white font-bold text-black"
              {...register('description')}
            ></textarea>
            <InputError message={errors.description?.message} />
            <TextField
              label="Link"
              placeholder="Paste the url link..."
              register={register}
              name="url_link"
              errors={errors}
            />
            <PrimaryButton className="w-full justify-center py-4" disabled={isSubmitting} type="submit">
              {isSubmitting ? 'Processing...' : 'Submit'}
            </PrimaryButton>
          </form>
        </div>
      </Modal>
    </div>
  );
};
