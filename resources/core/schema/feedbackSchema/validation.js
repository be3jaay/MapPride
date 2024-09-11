import * as yup from 'yup';

export const feedbackSchema = yup.object({
  feedback_value: yup.number().required().default(0),
  description: yup.string().required('Description is required').default(''),
});
