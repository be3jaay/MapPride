import * as yup from 'yup';

export const supportSchema = yup.object({
  title: yup.string().required('Title is required').default(''),
  description: yup.string().required('Description is required').default(''),
  phoneNumber: yup
    .number()
    .typeError('Phone number must be a number')
    .positive('Phone number must be positive')
    .integer('Phone number must be an integer')
    .test('len', 'Phone number must be 1-11 digits', val => val && val.toString().length <= 11)
    .required('Phone Number is required')
    .default(null),
});
