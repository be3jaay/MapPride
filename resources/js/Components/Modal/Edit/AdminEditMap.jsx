import PrimaryButton from '../../PrimaryButton';
import { ToastContainer } from 'react-toastify';
import Modal from '../../Modal';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useToastNotifications } from '../../../../core/hooks';

export const AdminEditMap = ({ map, isOpen, onClose }) => {
  if (!map) return null;

  const { notifyError, notifySuccess } = useToastNotifications();
  const [selection, setSelection] = useState([]);

  const form = useForm({
    mode: 'all',
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = form;

  const handleUpdate = async data => {
    try {
      const formData = new FormData();
      formData.append('_method', 'PATCH');
      formData.append('location', data.location);
      formData.append('longitude', data.longitude);
      formData.append('latitude', data.latitude);
      formData.append('image', data.image[0]);
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('address', data.address);
      formData.append('phone', data.phone);
      formData.append('services', JSON.stringify(data.services));

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

    const fetchSelection = async () => {
      try {
        const response = await axios.get('/api/map-selection');
        setSelection(response.data.data);
      } catch (error) {
        console.error('Error fetching selection:', error);
      }
    };

    fetchSelection();
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
                Location
                <select
                  className="select w-full bg-white text-black font-bold"
                  {...register('location', { required: 'The location field is required.' })}
                >
                  {selection.map((item, index) => (
                    <option key={index} value={item.location}>
                      {item.location}
                    </option>
                  ))}
                </select>
              </label>
              {errors.location && <p className="text-red-500">{errors.location.message}</p>}
              <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
                Longitude
                <input
                  type="text"
                  className="input w-full bg-transparent my-2"
                  placeholder="Longitude"
                  {...register('longitude', { required: 'The longitude field is required.' })}
                />
              </label>
              {errors.longitude && <p className="text-red-500">{errors.longitude.message}</p>}
              <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
                Latitude
                <input
                  type="text"
                  className="input w-full bg-transparent my-2"
                  placeholder="Latitude"
                  {...register('latitude', { required: 'The latitude field is required.' })}
                />
              </label>
              {errors.latitude && <p className="text-red-500">{errors.latitude.message}</p>}
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
                  {...register('title', { required: 'The title field is required.' })}
                />
              </label>
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
              <textarea
                placeholder="Enter description here..."
                className="textarea border-black w-full h-40 bg-white font-bold text-black"
                {...register('description', { required: 'The description field is required.' })}
              ></textarea>
              {errors.description && <p className="text-red-500">{errors.description.message}</p>}
              <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
                Address
                <input
                  type="text"
                  className="input w-full bg-transparent my-2"
                  placeholder="Address"
                  {...register('address', { required: 'The address field is required.' })}
                />
              </label>
              {errors.address && <p className="text-red-500">{errors.address.message}</p>}
              <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
                Phone
                <input
                  type="text"
                  className="input w-full bg-transparent my-2"
                  placeholder="Phone"
                  {...register('phone', { required: 'The phone field is required.' })}
                />
              </label>
              {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
              <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
                Services
                <input
                  type="text"
                  className="input w-full bg-transparent my-2"
                  placeholder="Services"
                  {...register('services')}
                />
              </label>
              <PrimaryButton
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center py-4 w-full"
              >
                {isSubmitting ? 'Updating...' : 'Update'}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
