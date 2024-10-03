import * as yup from 'yup';

export const trainingTabSchema = yup.object().shape({
  tabs_type: yup.string().required('Tabs is required').default('Training'),
  tabs_title: yup.string().required('Title is required').default(''),
});

export const trainingSchema = yup.object().shape({
  tabs_title: yup.string().required('Tab Title is required').default(''),
  title: yup.string().required('Title is required').default(''),
  description: yup.string().required('Title is required').default(''),
  url_link: yup.string().required('Title is required').default(''),
  credits: yup.string().required('Credits to owner is required').default(''),
  certificate: yup.number().optional().default(0),
});
