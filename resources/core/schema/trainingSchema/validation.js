import * as yup from 'yup';

export const trainingTabSchema = yup.object().shape({
  tabs_type: yup.string().required('Tabs is required').default('Training'),
  tabs_title: yup.string().required('Title is required').default(''),
});

export const trainingSchema = yup.object().shape({
  tabs_title: yup.string().required('Title is required').default(''),
  title: yup.string().required('Title is required').default(''),
  description: yup.string().required('Title is required').default(''),
  urllink: yup.string().required('Title is required').default(''),
});
