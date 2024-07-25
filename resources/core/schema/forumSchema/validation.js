import * as yup from 'yup';

export const forumSchema = yup.object().shape({
  username: yup.string().required('Username is required').default(''),
  title: yup.string().required('Title is required').default(''),
  experience_type: yup.string().required('Experience type is required').default(''),
  location: yup.string().required('Location is required').default(''),
  description: yup.string().required('Description is required').default(''),
});
