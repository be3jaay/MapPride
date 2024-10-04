// import PrimaryButton from '../../PrimaryButton';
// import { ToastContainer } from 'react-toastify';
// import Modal from '../../Modal';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useToastNotifications } from '../../../../core/hooks';
// import InputError from '../../InputError';

// export const AdminEditMap = ({ map, isOpen, onClose }) => {
//   const { notifyError, notifySuccess } = useToastNotifications();
//   const [selection, setSelection] = useState([]);

//   const form = useForm({
//     mode: 'all',
//   });

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { isSubmitting, errors },
//     setError,
//   } = form;

//   const handleUpdate = async data => {
//     // Initialize FormData
//     const formData = new FormData();

//     // Append form fields
//     formData.append('location', data.location || '');
//     formData.append('longitude', data.longitude || '');
//     formData.append('latitude', data.latitude || '');
//     formData.append('title', data.title || '');
//     formData.append('description', data.description || '');
//     formData.append('address', data.address || '');
//     formData.append('phone', data.phone || '');
//     formData.append('services', data.services || '');

//     // Append image if it exists
//     if (data.image && data.image.length > 0) {
//       formData.append('image', data.image[0]); // Correct way to send file
//     } else {
//       console.error('No image selected');
//     }

//     try {
//       await axios.put(`/api/map/${map.id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       reset();
//       notifySuccess('Training content updated successfully.');
//       onClose();
//     } catch (error) {
//       notifyError(error.response?.data?.message || 'There was an error updating the content.');
//     }
//   };

//   useEffect(() => {
//     reset({
//       title: map.title,
//       description: map.description,
//       location: map.location,
//       latitude: map.latitude,
//       longitude: map.longitude,
//       image: map.image,
//       address: map.address,
//       phone: map.phone,
//       services: map.services,
//     });

//     const fetchSelection = async () => {
//       try {
//         const response = await axios.get('/api/map-selection');
//         setSelection(response.data.data);
//       } catch (error) {
//         console.error('Error fetching selection:', error);
//       }
//     };

//     fetchSelection();
//   }, [map, reset]);

//   return (
//     <div>
//       <ToastContainer />
//       <Modal show={isOpen} onClose={onClose}>
//         <div className="modal-box bg-indigo-200 w-[60rem] p-12">
//           <div className="">
//             <h2 className="text-black text-2xl">Edit Training: {map.location}</h2>
//           </div>
//           <form onSubmit={handleSubmit(handleUpdate)}>
//             <div className="my-4">
//               <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
//                 Location
//                 <select
//                   className="select w-full bg-white text-black font-bold"
//                   {...register('location', { required: 'The location field is required.' })}
//                 >
//                   {selection.map((item, index) => (
//                     <option key={index} value={item.location}>
//                       {item.location}
//                     </option>
//                   ))}
//                 </select>
//               </label>
//               {errors.location && <InputError message={errors.location.message} />}
//               <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
//                 Longitude
//                 <input
//                   type="text"
//                   className="input w-full bg-transparent my-2"
//                   placeholder="Longitude"
//                   {...register('longitude', { required: 'The longitude field is required.', valueAsNumber: true })}
//                 />
//               </label>
//               {errors.longitude && <InputError message={errors.longitude.message} />}
//               <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
//                 Latitude
//                 <input
//                   type="text"
//                   className="input w-full bg-transparent my-2"
//                   placeholder="Latitude"
//                   {...register('latitude', { required: 'The latitude field is required.', valueAsNumber: true })}
//                 />
//               </label>
//               {errors.latitude && <InputError message={errors.latitude.message} />}
//               <input
//                 type="file"
//                 className="file-input file-input-bordered file-input-primary w-full bg-white"
//                 {...register('image')}
//               />
//               {errors.image && <InputError message={errors.image.message} />}
//               <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
//                 Title
//                 <input
//                   type="text"
//                   className="input w-full bg-transparent my-2"
//                   placeholder="Title"
//                   {...register('title', { required: 'The title field is required.' })}
//                 />
//               </label>
//               {errors.title && <InputError message={errors.title.message} />}
//               <textarea
//                 placeholder="Enter description here..."
//                 className="textarea border-black w-full h-40 bg-white font-bold text-black"
//                 {...register('description', { required: 'The description field is required.' })}
//               ></textarea>
//               {errors.description && <InputError message={errors.description.message} />}
//               <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
//                 Address
//                 <input
//                   type="text"
//                   className="input w-full bg-transparent my-2"
//                   placeholder="Address"
//                   {...register('address', { required: 'The address field is required.' })}
//                 />
//               </label>
//               {errors.address && <InputError message={errors.address.message} />}
//               <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
//                 Phone
//                 <input
//                   type="text"
//                   className="input w-full bg-transparent my-2"
//                   placeholder="Phone"
//                   {...register('phone', { required: 'The phone field is required.', valueAsNumber: true })}
//                 />
//               </label>
//               {errors.phone && <InputError message={errors.phone.message} />}
//               <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
//                 Services
//                 <input
//                   type="text"
//                   className="input w-full bg-transparent my-2"
//                   placeholder="Services"
//                   {...register('services')}
//                 />
//               </label>
//               <PrimaryButton
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="flex items-center justify-center py-4 w-full"
//               >
//                 {isSubmitting ? 'Updating...' : 'Update'}
//               </PrimaryButton>
//             </div>
//           </form>
//         </div>
//       </Modal>
//     </div>
//   );
// };
