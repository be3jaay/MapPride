import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { yupResolver } from '@hookform/resolvers/yup';
import { Head } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { feedbackSchema } from '../../../core/schema';
import 'react-toastify/dist/ReactToastify.css';
import { Alert } from '@/Components/Alert';
import axios from 'axios';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import { useCallback } from 'react';

const FormContent = ({ register, errors, auth }) => {
  return (
    <div className="py-4 lg:py-12">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-200 overflow-hidden shadow-sm sm:rounded-lg">
          <Alert
            type="info"
            message="Feedback"
            description="Help the application to grow, add a feedback on where/what can we improve, and if you found issues/bugs feel free to reach."
          />
        </div>
        <div className="card flex items-center justify-center bg-indigo-200 text-black w-full h-full mt-6">
          <div className="card-body">
            <h2 className="card-title justify-center">Send a feedback</h2>
            <p className="text-black justify-center">How was your experience selecting the star emoticons.</p>
            <div className="rating rating-lg flex items-center justify-center my-2">
              <input
                type="radio"
                value={1}
                className="mask mask-star-2 bg-indigo-700"
                {...register('feedback_value')}
              />
              <input
                type="radio"
                value={2}
                className="mask mask-star-2 bg-indigo-700"
                {...register('feedback_value')}
              />
              <input
                type="radio"
                value={3}
                className="mask mask-star-2 bg-indigo-700"
                {...register('feedback_value')}
              />
              <input
                type="radio"
                value={4}
                className="mask mask-star-2 bg-indigo-700"
                {...register('feedback_value')}
              />
              <input
                type="radio"
                value={5}
                className="mask mask-star-2 bg-indigo-700"
                {...register('feedback_value')}
              />
            </div>
            <textarea
              className="textarea textarea-bordered bg-white h-80 my-4"
              placeholder="Encountered any bugs or issues, send a report here..."
              {...register('description')}
            ></textarea>
            <InputError message={errors.description?.message} />

            <div className="card-actions justify-center">
              {auth.user.usertype === 'admin' ? (
                <PrimaryButton className="btn btn-primary w-full text-white" disabled type="submit">
                  Submit
                </PrimaryButton>
              ) : (
                <PrimaryButton className="btn btn-primary w-full text-white" type="submit">
                  Submit
                </PrimaryButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default function Feedback({ auth }) {
  const form = useForm({
    mode: 'all',
    resolver: yupResolver(feedbackSchema),
    defaultValues: feedbackSchema.getDefault(),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = useCallback(async data => {
    try {
      await axios.post('/api/feedback', data);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Form successfully submitted.',
      });
      reset();
    } catch (error) {
      notifyError('Form submission failed!');
      reset();
    }
  }, []);

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Dashboard" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContent register={register} errors={errors} auth={auth} />
      </form>
    </AuthenticatedLayout>
  );
}
