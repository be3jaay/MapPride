import * as yup from 'yup';

export const hotlineSchema = yup.object({
  title: yup.string().required('Title is required').default(''),
  description: yup.string().required('Description is required').default(''),
  phoneNumber: yup.string().required('Phone Number is Required').default(''),
});
