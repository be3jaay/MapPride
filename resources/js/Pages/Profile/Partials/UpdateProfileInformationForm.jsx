import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Alert } from '@/Components/Alert';
import { route } from 'ziggy-js';

export default function UpdateProfileInformation({ mustVerifyEmail, status }) {
  const user = usePage().props.auth.user;
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState('');

  const { data, setData, errors, setError, clearErrors, processing } = useForm({
    name: user.name,
    email: user.email,
    gender: user.gender,
    preferences: user.preferences,
    profile_picture: null,
  });

  useEffect(() => {
    setData({
      name: user.name,
      email: user.email,
      gender: user.gender,
      preferences: user.preferences,
      profile_picture: null,
    });
  }, [user]);

  const submit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('_method', 'PATCH');
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('preferences', data.preferences);
    formData.append('gender', data.gender);

    if (data.profile_picture) {
      formData.append('profile_picture', data.profile_picture);
    }

    axios
      .post(route('profile.update', user.id), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        clearErrors();
        setSuccessMessage('Profile updated successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch(error => {
        if (error.response?.data && error.response.data.errors) {
          Object.keys(error.response.data.errors).forEach(key => {
            setError(key, error.response.data.errors[key][0]);
          });
        } else {
          console.error('Error updating profile:', error);
        }
      });
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setData('profile_picture', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className={'w-full'}>
      <header>
        <h2 className="text-xl font-bold text-indigo-700">Profile Information</h2>
        <p className="mt-1 text-sm text-black">Update your account&apos;s profile information and email address.</p>
      </header>
      <form onSubmit={submit} className="mt-6 space-y-6">
        <div className="w-full flex items-center justify-between gap-2">
          <div className="w-full">
            <InputLabel htmlFor="name" value="Name" />
            <TextInput
              id="name"
              className="mt-1 w-full"
              value={data.name}
              onChange={e => setData('name', e.target.value)}
              required
              isFocused
              autoComplete="name"
            />
            <InputError className="mt-2" message={errors.name} />
          </div>
          <div className="w-full">
            <InputLabel htmlFor="gender" value="Gender" />
            <TextInput
              id="gender"
              className="mt-1 w-full"
              value={data.gender}
              onChange={e => setData('gender', e.target.value)}
              required
              autoComplete="gender"
            />
            <InputError className="mt-2" message={errors.gender} />
          </div>
        </div>
        <div className="w-full flex items-center justify-between gap-2">
          <div className="w-full">
            <InputLabel htmlFor="preferences" value="Preferences" />
            <TextInput
              id="preferences"
              className="mt-1 block w-full"
              value={data.preferences}
              onChange={e => setData('preferences', e.target.value)}
              required
              autoComplete="preferences"
            />
            <InputError className="mt-2" message={errors.preferences} />
          </div>
          <div className="w-full">
            <InputLabel htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              className="mt-1 block w-full"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              required
              autoComplete="email"
            />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="shrink-0">
            <img
              className="h-16 w-16 object-cover rounded-full"
              src={previewUrl || (user.profile_picture ? user.profile_picture : '/default-avatar.png')}
              alt={user.name || 'User'}
            />
          </div>
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input
              type="file"
              ref={fileInputRef}
              className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
              "
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <InputError className="mt-2" message={errors.profile_picture} />

        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
              Your email address is unverified.
              <Link
                href={route('verification.send')}
                method="post"
                as="button"
                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
              >
                Click here to re-send the verification email.
              </Link>
            </p>

            {status === 'verification-link-sent' && (
              <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                A new verification link has been sent to your email address.
              </div>
            )}
          </div>
        )}
        <div className="flex items-center gap-4 w-full">
          <PrimaryButton className="w-[10rem] py-4 justify-center" disabled={processing}>
            {processing ? 'Updating...' : 'Update'}
          </PrimaryButton>
        </div>
        {successMessage && <Alert message={successMessage} type="success" />}
      </form>
    </section>
  );
}
