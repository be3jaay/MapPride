import * as yup from 'yup';

export const resourcesForumSchema = yup.object().shape({
  tab: yup.string().required().default(''),
  title: yup.string().required().default(''),
  description: yup.string().required().default(''),
  urlLink: yup.string().required().default(''),
});
