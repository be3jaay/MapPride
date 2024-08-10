import * as yup from 'yup';

export const markerSchema = yup.object({
  location: yup.string().required().default(''),
  longitude: yup.number().required(),
  latitude: yup.number().required(),
  location_image: yup
    .mixed()
    .required('A file is required')
    .test('fileSize', 'File too large', value => {
      if (!value || !value.length) {
        return false;
      }
      return value[0].size <= 2000000;
    })
    .test('fileType', 'Unsupported file format', value => {
      if (!value || !value.length) {
        return false;
      }
      return ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
    }),
  location_title: yup.string().required().default(''),
  location_description: yup.string().required().default(''),
  location_services: yup.array().of(yup.string().required()).required(),
});
