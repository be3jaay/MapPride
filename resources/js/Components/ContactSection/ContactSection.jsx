import { FaArrowRightLong } from 'react-icons/fa6';
import PrimaryButton from '@/Components/PrimaryButton';
import contact from '../../../core/images/contact.png';
import { Link, Head } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer } from 'react-toastify';
import { MdEmail } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { contactSchema } from '../../../core/schema/contactSchema/validation';
import { useToastNotifications } from '../../../core/hooks';

export const ContactSection = () => {
  const { notifySuccess, notifyError } = useToastNotifications();

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(contactSchema),
    default: contactSchema.getDefault(),
  });

  const { register, handleSubmit, reset, processing, control } = form;

  const onSubmit = value => {
    console.log(value);
    notifySuccess('Form successfully submitted.');
    reset();
  };
  return (
    <>
      <ToastContainer />
      <section id="contact" className="w-full h-screen ">
        <div className=" bg-white flex items-center justify-between ">
          <img src={contact} alt="" className="h-screen w-[50rem]" />
          <div className="p-36 gap-2 mt-20">
            <h2 className="text-6xl font-bold text-gray-800">We can work this together.</h2>
            <p className="text-xl mt-2 text-black">
              You can message us directly here <span className="underline text-indigo-700">map-pride@gmail.com</span>
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <label
                control={control}
                className="input input-bordered flex items-center gap-2 mt-6"
                {...register('name')}
              >
                <FaRegUser />
                <input type="text" className="grow bg-transparent" placeholder="Your name here..." />
              </label>
              <label className="input input-bordered flex items-center gap-2 my-6">
                <MdEmail />
                <input type="text" className="grow" placeholder="Email" {...register('email')} />
              </label>
              <textarea
                className="textarea textarea-bordered my-2 gap-2 w-full h-40"
                placeholder="Inquiry here..."
                {...register('inquiry')}
              ></textarea>
              <PrimaryButton className="w-full justify-center py-4" disabled={processing} type="submit">
                Submit <IoSend className="ml-2" />
              </PrimaryButton>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
