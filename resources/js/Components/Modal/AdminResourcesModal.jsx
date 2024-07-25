import Modal from '@/Components/Modal';
import PrimaryButton from '../PrimaryButton';
import { MdForum } from 'react-icons/md';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resourcesForumSchema } from '../../../core/schema';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AdminResourcesModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const notify = () => toast('Your experience have been posted, Thank you.');

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

  const onSubmit = data => {
    reset();
    notify();
  };

  return (
    <>
      <ToastContainer />
      <PrimaryButton onClick={handleOpen}>
        Create Resources <MdForum className="ml-2" />
      </PrimaryButton>
      <Modal show={isOpen} onClose={closeModal}>
        <div className="modal-box bg-indigo-200 p-12">
          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-2xl text-indigo-800">Manage Resources Content</h3>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Tab
              <input
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Tab Title"
                {...register('tab')}
              />
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
                {...register('urlLink')}
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
