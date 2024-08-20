import * as yup from 'yup';

export const markerSchema = yup.object({
  location: yup.string().required().default(''),
  longitude: yup.number().required(),
  latitude: yup.number().required(),
  image: yup
    .mixed()
    .nullable()
    .test('fileSize', 'File too large', value => {
      if (!value || !value.length) return true;
      return value[0].size <= 2000000;
    })
    .test('fileType', 'Unsupported file format', value => {
      if (!value || !value.length) return true;
      return ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
    }),
  title: yup.string().required().default(''),
  description: yup.string().required().default(''),
  address: yup.string().required().default(''),
  phone: yup.string().nullable(), // Changed from number to string, or remove if not needed
  services: yup.array().of(yup.string().required()).nullable(), // Changed to nullable for flexibility
});
