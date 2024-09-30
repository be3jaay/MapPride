import Modal from '@/Components/Modal';
import PrimaryButton from '../../PrimaryButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { commentSchema } from '../../../../core/schema'; // Adjust the path as necessary
import { useToastNotifications } from '../../../../core/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const CommentBlogModal = ({ isOpen, onClose, blogId, auth }) => {
  const { notifyError, notifySuccess } = useToastNotifications();
  const user = auth.user;
  const [username, setUsername] = useState(user.name);
  const [icon, setIcon] = useState(user.profile_picture);

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(commentSchema), // Define your validation schema
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    setValue('username', username);
    setValue('icon', icon);
  }, [setValue, username, icon]);

  const onSubmit = async data => {
    try {
      await axios.post(`/api/blogs/${blogId}/comments`, data);
      notifySuccess('Your comment has been posted, thank you.');
      reset();
      onClose();
    } catch (error) {
      notifyError('There was an error posting your comment.');
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <div className="modal-box bg-indigo-200 w-[60rem] p-12">
        <h3 className="font-bold text-2xl mb-4 text-indigo-700">Add a Comment</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            className="textarea border-black w-full h-32 bg-white font-bold text-black"
            placeholder="Write your comment here..."
            {...register('content')}
          ></textarea>
          <div className="flex justify-end mt-4 gap-2">
            <PrimaryButton
              className="flex items-center justify-center py-4 text-white bg-green-600"
              disabled={isSubmitting}
              type="submit"
            >
              Submit
            </PrimaryButton>
          </div>
        </form>
      </div>
    </Modal>
  );
};
