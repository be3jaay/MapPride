import * as yup from 'yup';

export const tabSchema = yup.object().shape({
  tabs_type: yup.string().required('Tabs is required').default(''),
  tabs_title: yup.string().required('Title is required').default(''),
});
