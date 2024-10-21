import * as yup from 'yup';

export const supportSchema = yup.object({
  title: yup.string().required('Title is required').default(''),
  description: yup.string().required('Description is required').default(''),
  phoneNumber: yup.string().required('Phone Number is Required').default(''),
  service: yup.string().required('Services is Required').default(''),
});
