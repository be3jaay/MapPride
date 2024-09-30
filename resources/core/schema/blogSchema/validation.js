import * as yup from 'yup';

export const blogSchema = yup.object().shape({
  username: yup.string().required('Username is required').default(''),
  title: yup.string().required('Title is required').default(''),
  description: yup.string().required('Description is required').default(''),
});
