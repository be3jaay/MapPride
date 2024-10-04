import { FaUserCheck } from 'react-icons/fa';
import PrimaryButton from '../../PrimaryButton';
import { ToastContainer } from 'react-toastify';
import Modal from '../../Modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { trainingSchema } from '../../../../core/schema';
import axios from 'axios';
import { useEffect, handleUpdate } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useToastNotifications } from '../../../../core/hooks';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { TextField } from '@/Components/TextField';

const MySwal = withReactContent(Swal);

const EditTrainingForm = ({ handleSubmit, handleUpdate, register, errors, isSubmitting }) => {
  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <TextField label="Title" placeholder="Type your title here..." register={register} name="title" errors={errors} />
      <div className="my-4">
        <textarea
          placeholder="Description here..."
          className="textarea border-black w-full h-64 bg-white font-bold text-black"
          {...register('description')}
        ></textarea>
      </div>
      <TextField label="Link" placeholder="Paste the url link..." register={register} name="url_link" errors={errors} />
      <TextField label="Credits" placeholder="Credits to owner..." register={register} name="credits" errors={errors} />
      <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
        Certificate
        <select className="select w-full bg-white text-black font-bold my-4" {...register('certificate')}>
          <option value={1}>Have Free Certificate</option>
          <option value={0}>Have No Free Certificate</option>
        </select>
      </label>
      <div className="w-full flex justify-end mt-4 gap-2">
        <PrimaryButton
          className="w-full flex items-center justify-center py-4 text-white bg-green-600"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? 'Updating...' : 'Update'}
          <FaUserCheck className="ml-2" />
        </PrimaryButton>
      </div>
    </form>
  );
};
export const AdminEditTraining = ({ training, isOpen, onClose }) => {
  const { notifyError } = useToastNotifications();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(trainingSchema),
    defaultValues: {
      ...trainingSchema.getDefault(),
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = form;

  const handleUpdate = useCallback(
    async data => {
      try {
        await axios.put(`/api/training/${training.id}`, data);
        MySwal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Training content updated successfully.',
        });
        onClose();
        reset();
      } catch (error) {
        notifyError('There was an error updating the training content.');
      }
    },
    [notifyError],
  );

  useEffect(() => {
    reset({
      tabs_title: training.tabs_title,
      title: training.title,
      description: training.description,
      url_link: training.url_link,
      credits: training.credits,
      certificate: training.certificate ? 1 : 0,
    });
  }, [training, reset]);

  return (
    <Modal show={isOpen} onClose={onClose}>
      <ToastContainer />
      <div className="modal-box bg-indigo-200 w-[60rem] p-12">
        <div className="">
          <h2 className="text-black text-2xl font-bold">Tab Title: {training.tabs_title}</h2>
          <EditTrainingForm
            errors={errors}
            handleSubmit={handleSubmit}
            handleUpdate={handleUpdate}
            isSubmitting={isSubmitting}
            register={register}
          />
        </div>
      </div>
    </Modal>
  );
};
