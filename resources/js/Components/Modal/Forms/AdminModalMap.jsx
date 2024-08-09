import Modal from '@/Components/Modal';
import PrimaryButton from '../../PrimaryButton';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { markerSchema } from '../../../../core/schema';
import { ToastContainer } from 'react-toastify';
import { useToastNotifications } from '../../../../core/hooks';
import axios from 'axios';
import useModal from '../../../../core/hooks/use-modal';

export const AdminModalMap = () => {
  const [selection, setSelection] = useState([]);

  const { notifyError, notifySuccess } = useToastNotifications();
  const { handleOpen, isOpen, closeModal } = useModal();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(markerSchema),
    defaultValues: markerSchema.getDefault(),
  });

  const { register, handleSubmit, reset, processing } = form;

  const onSubmit = async data => {
    try {
      await axios.post('/api/marker-location', data);
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
        const response = await axios.get('/api/map-selection');
        const selectionTitle = response.data.data;
        setSelection(selectionTitle);
      } catch (error) {
        console.error('Error fetching tabs:', error);
      }
    };

    fetchTabs();
  }, []);

  return (
    <>
      <ToastContainer />
      <div
        onClick={handleOpen}
        className="w-[20rem] h-[20rem] flex items-center justify-center bg-white shadow-lg text-black font-bold text-2xl cursor-pointer"
      >
        Create Marker
      </div>
      <Modal show={isOpen} onClose={closeModal}>
        <div className="modal-box bg-indigo-200 p-12 w-[32rem]">
          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-2xl text-indigo-800">Create a marker:</h3>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Selection
              <select className="select w-full bg-white text-black font-bold my-4" {...register('location')}>
                {selection.map((item, index) => (
                  <option key={index}>{item.location}</option>
                ))}
              </select>
            </label>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Longitude
              <input
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Title"
                {...register('longitude')}
              />
            </label>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Latitude
              <input
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Title"
                {...register('latitude')}
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
