import * as yup from 'yup';

export const forumSchema = yup.object().shape({
  username: yup.string().required().default(''),
  experience: yup.string().required().default(''),
  location: yup.string().required().default(''),
  description: yup.string().required().default(''),
});
