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

export const AdminResourcesModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tabs, setTabs] = useState([]);

  const { notifyError, notifySuccess } = useToastNotifications();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    reset();
  };

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(resourcesForumSchema),
    defaultValues: resourcesForumSchema.getDefault(),
  });

  const { register, handleSubmit, reset, processing } = form;

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
    <>
      <ToastContainer />
      <PrimaryButton onClick={handleOpen}>
        Create Resources Content
        <MdForum className="ml-2" />
      </PrimaryButton>
      <Modal show={isOpen} onClose={closeModal}>
        <div className="modal-box bg-indigo-200 p-12 max-w-7xl">
          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-2xl text-indigo-800">
              How are you? This is a freedom wall, feel free to share your experience here.
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
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Title
              <input
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Title"
                {...register('title')}
              />
            </label>
            <textarea
              placeholder="Enter description here..."
              className="textarea border-black w-full h-64 bg-white font-bold text-black"
              {...register('description')}
            ></textarea>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Link
              <input
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Paste the url link"
                {...register('url_link')}
              />
            </label>
            <PrimaryButton className="w-full justify-center py-4" disabled={processing} type="submit">
              Submit
            </PrimaryButton>
          </form>
        </div>
      </Modal>
    </>
  );
};
