import Modal from '@/Components/Modal';
import PrimaryButton from '../../PrimaryButton';
import { MdForum } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { hotlineSchema } from '../../../../core/schema';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useToastNotifications } from '../../../../core/hooks';
import useModal from '../../../../core/hooks/use-modal';

export const AdminHotlineModal = () => {
  const { handleOpen, isOpen, closeModal } = useModal();
  const { notifyError, notifySuccess } = useToastNotifications();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(hotlineSchema),
    defaultValues: hotlineSchema.getDefault(),
  });

  const { register, handleSubmit, reset, processing, control } = form;

  const onSubmit = async data => {
    try {
      await axios.post('/api/hotlines', data);
      reset();
      notifySuccess('Your experience has been posted, thank you.');
    } catch (error) {
      notifyError('There was an error posting your experience.');
    }
  };

  return (
    <>
      <ToastContainer />
      <PrimaryButton onClick={handleOpen}>
        Create Hotline Content <MdForum className="ml-2" />
      </PrimaryButton>
      <Modal show={isOpen} onClose={closeModal}>
        <div className="modal-box bg-indigo-200 p-12 max-w-7xl">
          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-2xl text-indigo-800 text-center">
              This modal is used to create support content for users.
            </h3>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Title
              <input
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Title"
                {...register('title')}
                control={control}
              />
            </label>
            <textarea
              placeholder="Enter description here..."
              className="textarea border-black w-full h-64 bg-white font-bold text-black"
              {...register('description')}
              control={control}
            ></textarea>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Phone
              <input
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Paste the url link"
                {...register('phoneNumber')}
                control={control}
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
