import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaRetweet } from 'react-icons/fa';
import { route } from 'ziggy-js';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    preferences: '',
    resume: '',
    password: '',
    password_confirmation: '',
  });

  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const handleSelectChange = e => {
    const value = e.target.value;
    if (value === 'other') {
      setIsOtherSelected(true);
      setData('preferences', '');
    } else {
      setIsOtherSelected(false);
      setData('preferences', value);
    }
  };

  const backToSelect = () => {
    setIsOtherSelected(!isOtherSelected);
  };

  const handleTextChange = e => {
    setData('preferences', e.target.value);
  };

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  useEffect(() => {
    setData('gender', data.preferences);
  }, [data.preferences]);

  const submit = e => {
    e.preventDefault();
    post(route('register'));
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="name" value="Name" />

          <TextInput
            id="name"
            name="name"
            value={data.name}
            className="mt-1 mb-3 block w-full"
            autoComplete="name"
            isFocused
            onChange={e => setData('name', e.target.value)}
            required
          />

          <InputError message={errors.name} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="preferences" value="Preferences" />

          {isOtherSelected ? (
            <>
              <TextInput
                id="preferences"
                name="preferences"
                value={data.preferences}
                className="mt-1  block w-full"
                autoComplete="preferences"
                isFocused
                onChange={handleTextChange}
                required
              />

              <button className="relative bottom-10 left-[370px] " onClick={backToSelect}>
                <FaRetweet />
              </button>
            </>
          ) : (
            <select
              name="preferences"
              id="preferences"
              value={data.preferences}
              autoComplete="preferences"
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md bg-white h-14 text-black mt-1 mb-3"
              required
              onChange={handleSelectChange}
            >
              <option value="Prefer Not To Say">Prefer Not To Say</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Lesbian">Lesbian</option>
              <option value="Gay">Gay</option>
              <option value="Bisexual">Bisexual</option>
              <option value="Transgender">Transgender</option>
              <option value="Queer">Queer</option>
              <option value="Intersex">Intersex</option>
              <option value="Asexual">Asexual</option>
              <option value="other">Other</option>
            </select>
          )}

          <InputError message={errors.preferences} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="email"
            onChange={e => setData('email', e.target.value)}
            required
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
            autoComplete="new-password"
            onChange={e => setData('password', e.target.value)}
            required
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

          <TextInput
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 mb-3 block w-full"
            autoComplete="new-password"
            onChange={e => setData('password_confirmation', e.target.value)}
            required
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Link
            href={route('login')}
            className="underline text-sm text-black hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          >
            Already registered?
          </Link>

          <PrimaryButton className="ms-4" disabled={processing}>
            Register
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
