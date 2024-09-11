import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import { useToastNotifications } from '../../../../core/hooks';
import axios from 'axios';
import useModal from '../../../../core/hooks/use-modal';
import Modal from '@/Components/Modal';
import PrimaryButton from '../../PrimaryButton';

export const AdminModalMap = () => {
  const [selection, setSelection] = useState([]);
  const { notifyError, notifySuccess } = useToastNotifications();
  const { handleOpen, isOpen, closeModal } = useModal();

  const form = useForm({
    mode: 'all',
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async data => {
    try {
      const formData = new FormData();
      formData.append('location', data.location);
      formData.append('longitude', data.longitude);
      formData.append('latitude', data.latitude);
      formData.append('image', data.image[0]);
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('address', data.address);
      formData.append('phone', data.phone);
      formData.append('services', JSON.stringify(data.services));

      await axios.post('/api/map', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      notifySuccess('Your marker has been created, thank you.');
      closeModal();
      reset();
    } catch (error) {
      console.error('Submission Error:', error);
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
      <PrimaryButton onClick={handleOpen}>Create Marker</PrimaryButton>
      <Modal show={isOpen} onClose={closeModal}>
        <div className="modal-box bg-indigo-200 p-12 max-w-7xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-2xl text-indigo-800 ">Create a marker: This will be posted in user's map.</h3>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Selection
              <select className="select w-full bg-white text-black font-bold my-4" {...register('location')}>
                {selection.map((item, index) => (
                  <option key={index} value={item.location}>
                    {item.location}
                  </option>
                ))}
              </select>
            </label>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Longitude
              <input
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Longitude"
                {...register('longitude')}
              />
            </label>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Latitude
              <input
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Latitude"
                {...register('latitude')}
              />
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full bg-white"
              {...register('image')}
            />
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
              className="textarea border-black w-full h-40 bg-white font-bold text-black"
              {...register('description')}
            ></textarea>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Address
              <input
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Address"
                {...register('address')}
              />
            </label>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Phone
              <input
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Phone"
                {...register('phone')}
              />
            </label>
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Services
              <input
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Services"
                {...register('services')}
              />
            </label>
            <PrimaryButton className="w-full justify-center py-4" disabled={isSubmitting} type="submit">
              Submit
            </PrimaryButton>
          </form>
        </div>
      </Modal>
    </>
  );
};
