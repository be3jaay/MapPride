import * as yup from 'yup';

export const mapSchema = yup.object({
  location: yup.string().required('Location is required'),
  longitude: yup.number().required('Longitude is required').typeError('Must be a number'),
  latitude: yup.number().required('Latitude is required').typeError('Must be a number'),
  image: yup.mixed().nullable(), // Image is optional
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  address: yup.string().required('Address is required'),
  phone: yup.number().required('Phone number is required').typeError('Phone must be a number'),
  services: yup.array().of(yup.string().required('Service is required')).min(1, 'At least one service is required'),
  usertype: yup.string().required('User type is required'),
  username: yup.string().required('Username is required'),
  is_Verified: yup.number().required('Verification is required'),
});
