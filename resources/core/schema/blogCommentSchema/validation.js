import * as yup from 'yup';

export const commentSchema = yup.object().shape({
  username: yup.string().required('Username is required').default(''),
  content: yup.string().required('Content is required').default(''),
  icon: yup.string().optional('Icon is required').default(''),
});
