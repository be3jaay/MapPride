import * as yup from 'yup';

export const resourcesForumSchema = yup.object({
  tabs_title: yup.string().required('Tab Title is required').default(''),
  title: yup.string().required('Title is required').default(''),
  description: yup.string().required('Description is required').default(''),
  url_link: yup.string().required('Link is required').default(),
});
