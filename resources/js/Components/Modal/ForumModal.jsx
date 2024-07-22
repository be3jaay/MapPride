import Modal from '@/Components/Modal';
import PrimaryButton from '../PrimaryButton';
import { MdForum } from 'react-icons/md';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { forumSchema } from '../../../core/schema';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ForumModal = () => {
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
    resolver: yupResolver(forumSchema),
    defaultValues: forumSchema.getDefault(),
  });

  const { register, handleSubmit, reset } = form;

  const onSubmit = data => {
    console.log(data);
    reset();
    notify();
  };

  return (
    <>
      <ToastContainer />
      <PrimaryButton onClick={handleOpen}>
        Share Experience <MdForum />
      </PrimaryButton>

      <Modal show={isOpen} onClose={closeModal}>
        <div className="modal-box bg-indigo-200 max-w-7xl p-12">
          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            <button
              className="btn btn-md text-black btn-circle btn-ghost absolute right-2 top-2"
              type="button"
              onClick={closeModal}
            >
              ✕
            </button>
            <h3 className="font-bold text-2xl text-indigo-800">
              How are you? This is a freedom wall, feel free to share your experience here.
            </h3>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Username
              <input
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Type your anonymous name here.."
                {...register('username')}
              />
            </label>
            <select
              className="select select-bordered w-full p-4 h-14 bg-white border-black text-black font-bold"
              {...register('experience')}
            >
              <option value="" disabled selected>
                Type of experience
              </option>
              <option value="Harassment">Harassment</option>
              <option value="Bullying">Bullying</option>
              <option value="Cyber-Bullying">Cyber-Bullying</option>
              <option value="CatCalled">CatCalled</option>
              <option value="Mental Issue">Mental Issue</option>
            </select>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Location
              <input
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Type your anonymous name here.."
                {...register('location')}
              />
            </label>
            <textarea
              placeholder="Share your experience here..."
              className="textarea border-black w-full h-64 bg-white font-bold text-black"
              {...register('description')}
            ></textarea>
            <button className="btn btn-primary w-full text-white mt-2" type="submit">
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};
