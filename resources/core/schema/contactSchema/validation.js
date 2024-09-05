import * as yup from 'yup';

export const contactSchema = yup.object({
  name: yup.string().required('Your name is required').default(''),
  email: yup.string().email('This must be a valid email').required('Email is required').default(''),
  inquiry: yup.string().required('This field must be required').default(),
});
