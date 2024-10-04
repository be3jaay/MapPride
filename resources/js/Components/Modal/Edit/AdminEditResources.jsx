import PrimaryButton from '../../PrimaryButton';
import Modal from '../../Modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resourcesForumSchema } from '../../../../core/schema';
import axios from 'axios';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { TextField } from '@/Components/TextField';

const MySwal = withReactContent(Swal);

const EditResourcesForms = ({ handleSubmit, handleUpdate, register, errors, isSubmitting }) => {
  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <div className="my-4">
        <TextField
          label="Title"
          placeholder="Type your title here..."
          register={register}
          name="title"
          errors={errors}
        />
      </div>
      <div className="my-4">
        <textarea
          placeholder="Description here..."
          className="textarea border-black w-full h-64 bg-white font-bold text-black"
          {...register('description')}
        ></textarea>
      </div>
      <div className="my-4">
        <TextField
          label="Link"
          placeholder="Paste the url link..."
          register={register}
          name="url_link"
          errors={errors}
        />
      </div>
      <div className="flex justify-end mt-4 gap-2 w-full">
        <PrimaryButton
          className="w-full flex items-center justify-center py-4 text-white bg-green-600"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? 'Submitting' : 'Submit'}
        </PrimaryButton>
      </div>
    </form>
  );
};
export const AdminEditResources = ({ resources, isOpen, onClose }) => {
  if (!resources) return null;

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(resourcesForumSchema),
    defaultValues: {
      ...resourcesForumSchema.getDefault(),
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = form;

  const handleUpdate = async data => {
    try {
      await axios.put(`/api/resources/${resources.id}`, data);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Resource content updated successfully.',
      });
      reset();
      onClose();
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Resource content submitted incorrectly.',
      });
    }
  };

  useEffect(() => {
    reset({
      tabs_title: resources.tabs_title,
      title: resources.title,
      description: resources.description,
      url_link: resources.url_link,
    });
  }, [resources, reset]);

  return (
    <Modal show={isOpen} onClose={onClose}>
      <div className="modal-box bg-indigo-200 w-[60rem] p-12">
        <div className="">
          <h2 className="text-black text-2xl">Edit Training: {resources.tabs_title}</h2>
          <EditResourcesForms
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
