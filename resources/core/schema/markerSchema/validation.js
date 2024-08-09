import * as yup from 'yup';

export const markerSchema = yup.object({
  location: yup.string().required().default(''),
  longitude: yup.number().required(),
  latitude: yup.number().required(),
});
