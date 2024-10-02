import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { route } from 'ziggy-js';

export default function UpdatePasswordForm({ className = '' }) {
  const passwordInput = useRef();
  const currentPasswordInput = useRef();

  const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const updatePassword = e => {
    e.preventDefault();

    put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: errorMessages => {
        if (errorMessages.password) {
          reset('password', 'password_confirmation');
          passwordInput.current.focus();
        }

        if (errorMessages.current_password) {
          reset('current_password');
          currentPasswordInput.current.focus();
        }
      },
    });
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-xl font-medium text-indigo-700">Update Password</h2>

        <p className="mt-1 text-sm text-black">Ensure your account is using a long, random password to stay secure.</p>
      </header>

      <form onSubmit={updatePassword} className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="current_password" value="Current Password" />
          <TextInput
            id="current_password"
            ref={currentPasswordInput}
            value={data.current_password}
            onChange={e => setData('current_password', e.target.value)}
            type="password"
            className="mt-1 block w-full"
            autoComplete="current-password"
          />
          <InputError message={errors.current_password} className="mt-2" />
        </div>
        <div>
          <InputLabel htmlFor="password" value="New Password" />
          <TextInput
            id="password"
            ref={passwordInput}
            value={data.password}
            onChange={e => setData('password', e.target.value)}
            type="password"
            className="mt-1 block w-full"
            autoComplete="new-password"
          />
          <InputError message={errors.password} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
          <TextInput
            id="password_confirmation"
            value={data.password_confirmation}
            onChange={e => setData('password_confirmation', e.target.value)}
            type="password"
            className="mt-1 block w-full"
            autoComplete="new-password"
          />
          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>
        <div className="flex items-center gap-4 w-full ">
          <PrimaryButton className="w-[10rem] py-4 justify-center" disabled={processing}>
            {processing ? 'Updating' : 'Update'}
          </PrimaryButton>
          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
