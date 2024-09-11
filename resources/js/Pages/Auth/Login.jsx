import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useToastNotifications } from '../../../core/hooks';

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const { notifyError, notifySuccess } = useToastNotifications();

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const submit = e => {
    notifySuccess('Success');
    e.preventDefault();
    post(route('login'));
  };

  return (
    <GuestLayout>
      <Head title="Login" />
      {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="email" value="Email" />
          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            isFocused={true}
            onChange={e => setData('email', e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />
          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={e => setData('password', e.target.value)}
          />
          <InputError message={errors.password} className="mt-2" />
        </div>
        <div className="flex my-4 items-center justify-between">
          <label className="flex items-center">
            <Checkbox name="remember" checked={data.remember} onChange={e => setData('remember', e.target.checked)} />
            <span className="ms-2 text-md text-black">Remember me</span>
          </label>
          {canResetPassword && (
            <Link
              href={route('password.request')}
              className="underline text-md text-black dark:hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              Forgot your password?
            </Link>
          )}
        </div>

        <div className="flex items-center justify-between my-4">
          <Link href={route('register')} className="text-black">
            Don't have an account?{' '}
            <span className="underline font-bold text-md text-black dark:hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
              Register here
            </span>
          </Link>
          <PrimaryButton className="ms-4" disabled={processing}>
            Login
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
