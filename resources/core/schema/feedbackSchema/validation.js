import * as yup from 'yup';

export const feedbackSchema = yup.object({
  radioValue: yup.string().required().default(''),
  description: yup.string().required().default(''),
});
