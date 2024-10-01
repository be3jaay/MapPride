import PrimaryButton from '@/Components/PrimaryButton';
import message from '../../../core/images/message.png';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer } from 'react-toastify';
import { MdEmail } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { contactSchema } from '../../../core/schema/contactSchema/validation';
import { useToastNotifications } from '../../../core/hooks';
import InputError from '../InputError';

export const ContactSection = () => {
  const { notifySuccess, notifyError } = useToastNotifications();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(contactSchema),
    default: contactSchema.getDefault(),
  });

  const {
    register,
    handleSubmit,
    reset,
    processing,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = value => {
    notifySuccess('Form successfully submitted.');
    reset();
  };

  return (
    <>
      <ToastContainer />
      <section id="contact" className="w-full h-full lg:h-screen bg-white">
        <div className="flex items-center justify-between flex-col lg:flex-row">
          <img src={message} alt="" className="h-full lg:h-auto w-[60rem]" />
          <div className="p-12 lg:p-36 gap-2 mt-0 lg:mt-20 ">
            <h2 className="text-center text-2xl lg:text-6xl font-bold text-gray-800">We can work this together.</h2>
            <p className="text-md text-center lg:text-xl mt-2 text-black">
              You can message us directly here <span className="underline text-indigo-700">map-pride@gmail.com</span>
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <label control={control} className="input input-bordered flex items-center gap-2 mt-6">
                <FaRegUser />
                <input
                  type="text"
                  className="grow bg-transparent"
                  placeholder="Your name here..."
                  {...register('name')}
                />
              </label>
              <InputError message={errors.name?.message} />
              <label className="input input-bordered flex items-center gap-2 my-6">
                <MdEmail />
                <input type="text" className="grow" placeholder="Email" {...register('email')} />
              </label>
              <InputError message={errors.email?.message} />
              <textarea
                className="textarea textarea-bordered my-2 gap-2 w-full h-40"
                placeholder="Inquiry here..."
                {...register('inquiry')}
              ></textarea>
              <InputError message={errors.inquiry?.message} />
              <PrimaryButton className="w-full justify-center py-4" disabled={isSubmitting} type="submit">
                {isSubmitting ? 'Submittting' : 'Submit'} <IoSend className="ml-2" />
              </PrimaryButton>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
