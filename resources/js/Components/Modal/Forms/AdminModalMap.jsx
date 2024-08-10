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
  const [services, setServices] = useState(['']);

  const { notifyError, notifySuccess } = useToastNotifications();
  const { handleOpen, isOpen, closeModal } = useModal();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(markerSchema),
    defaultValues: markerSchema.getDefault(),
  });

  const { register, handleSubmit, reset, processing } = form;

  const onSubmit = async data => {
    const formData = new FormData();
    formData.append('longitude', data.longitude);
    formData.append('latitude', data.latitude);
    formData.append('location_image', data.location_image[0]);
    formData.append('location_title', data.location_title);
    formData.append('location_description', data.location_description);

    services.forEach((service, index) => {
      formData.append(`location_services[${index}]`, service);
    });

    try {
      await axios.post('/api/marker-location', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      notifySuccess('Your resources have been created, thank you.');
      closeModal();
      reset();
      setServices(['']);
    } catch (error) {
      notifyError('There was an error posting your experience.');
    }
  };

  const handleAddService = () => {
    setServices([...services, '']);
  };

  const handleRemoveService = index => {
    const newServices = [...services];
    newServices.splice(index, 1);
    setServices(newServices);
  };

  const handleServiceChange = (index, value) => {
    const newServices = [...services];
    newServices[index] = value;
    setServices(newServices);
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
        className="flex items-center justify-center bg-white shadow-lg text-black font-bold text-2xl cursor-pointer"
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
              {...register('location_image')}
            />
            <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
              Title
              <input
                type="text"
                className="input w-full bg-transparent my-2"
                placeholder="Title"
                {...register('location_title')}
              />
            </label>
            <textarea
              placeholder="Enter description here..."
              className="textarea border-black w-full h-40 bg-white font-bold text-black"
              {...register('location_description')}
            ></textarea>

            {services.map((service, index) => (
              <div key={index} className="flex items-center gap-2 my-2">
                <input
                  type="text"
                  className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold"
                  placeholder="Service"
                  {...register(`location_services.${index}`)} // Integrating with react-hook-form
                  value={service}
                  onChange={e => handleServiceChange(index, e.target.value)}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveService(index)}
                    className="text-red-500 font-bold block"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={handleAddService} className="text-indigo-800 font-bold">
              + Add another service
            </button>
            <PrimaryButton className="w-full justify-center py-4" disabled={processing} type="submit">
              Submit
            </PrimaryButton>
          </form>
        </div>
      </Modal>
    </>
  );
};
