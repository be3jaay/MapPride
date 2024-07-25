import * as yup from 'yup';

export const resourcesForumSchema = yup.object().shape({
  tabs_title: yup.string().required().default(''),
  title: yup.string().required().default(''),
  description: yup.string().required().default(''),
  url_link: yup.string().required().default(''),
});
