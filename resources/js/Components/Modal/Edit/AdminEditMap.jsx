import PrimaryButton from '../../PrimaryButton';
import { ToastContainer } from 'react-toastify';
import Modal from '../../Modal';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect } from 'react';
import { useToastNotifications } from '../../../../core/hooks';

export const AdminEditMap = ({ map, isOpen, onClose }) => {
  if (!map) return null;

  const { notifyError, notifySuccess } = useToastNotifications();

  const form = useForm({
    mode: 'all',
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = form;

  const handleUpdate = async data => {
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      await axios.put(`/api/map/${map.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      reset();
      notifySuccess('Training content updated successfully.');
      onClose();
    } catch (error) {
      notifyError('There was an error updating the training content.');
    }
  };

  useEffect(() => {
    reset({
      title: map.title,
      description: map.description,
      location: map.location,
      latitude: map.latitude,
      longitude: map.longitude,
      address: map.address,
      phone: map.phone,
      services: map.services,
    });
  }, [map, reset]);

  return (
    <>
      <ToastContainer />
      <Modal show={isOpen} onClose={onClose}>
        <div className="modal-box bg-indigo-200 w-[60rem] p-12">
          <div className="">
            <h2 className="text-black text-2xl">Edit Training: {map.location}</h2>
          </div>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <div className="my-4">
              <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
                Longitude
                <input
                  type="text"
                  className="input w-full bg-transparent my-2"
                  placeholder="Longitude"
                  {...register('longitude', { required: true })}
                />
              </label>
              <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
                Latitude
                <input
                  type="text"
                  className="input w-full bg-transparent my-2"
                  placeholder="Latitude"
                  {...register('latitude', { required: true })}
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
                  {...register('title', { required: true })}
                />
              </label>
              <textarea
                placeholder="Enter description here..."
                className="textarea border-black w-full h-40 bg-white font-bold text-black"
                {...register('description', { required: true })}
              ></textarea>
              <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
                Address
                <input
                  type="text"
                  className="input w-full bg-transparent my-2"
                  placeholder="Address"
                  {...register('address', { required: true })}
                />
              </label>
              <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
                Phone
                <input
                  type="text"
                  className="input w-full bg-transparent my-2"
                  placeholder="Phone"
                  {...register('phone', { required: true })}
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
              <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
                Location
                <input
                  type="text"
                  className="input w-full bg-transparent my-2"
                  placeholder="Location"
                  {...register('location', { required: true })}
                />
              </label>
              <PrimaryButton type="submit" disabled={isSubmitting} className="flex items-center justify-center py-2">
                {isSubmitting ? 'Submitting...' : 'Update'}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
