import * as yup from 'yup';

export const hotlineSchema = yup.object({
  title: yup.string().required().default(''),
  description: yup.string().required().default(''),
  phoneNumber: yup.number().required().default(''),
});
