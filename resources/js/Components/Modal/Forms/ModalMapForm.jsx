import PrimaryButton from '@/Components/PrimaryButton';
import { TextField } from '@/Components/TextField';

export const ModalMapForm = ({
  handleSubmit,
  onSubmit,
  register,
  selection,
  handleCheckboxChange,
  isSubmitting,
  errors,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="font-bold text-2xl text-indigo-800 ">Create a marker: This will be posted in user&apos;s map.</h3>
      <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
        Selection
        <select className="select w-full bg-white text-black font-bold my-4" {...register('location')}>
          {selection.map(item => (
            <option key={item.id} value={item.location}>
              {item.location}
            </option>
          ))}
        </select>
      </label>
      <TextField
        label="Longitude"
        placeholder="Type your latitude here..."
        register={register}
        name="longitude"
        errors={errors}
      />
      <TextField
        label="Latitude"
        placeholder="Type your latitude here..."
        register={register}
        name="latitude"
        errors={errors}
      />
      <input
        type="file"
        className="file-input file-input-bordered file-input-primary w-full bg-white"
        {...register('image')}
      />
      <TextField label="Title" placeholder="Type your title here..." register={register} name="title" errors={errors} />
      <textarea
        placeholder="Enter description here..."
        className="textarea border-black w-full h-40 bg-white font-bold text-black"
        {...register('description')}
      ></textarea>
      <TextField
        label="Address"
        placeholder="Type your address here..."
        register={register}
        name="address"
        errors={errors}
      />
      <TextField label="Phone" placeholder="Contact Number here..." register={register} name="phone" errors={errors} />
      <TextField
        label="Services"
        placeholder="Type your available service here..."
        register={register}
        name="service1"
        errors={errors}
      />
      <TextField
        label="Services"
        placeholder="Type your available service here..."
        register={register}
        name="service2"
        errors={errors}
      />
      <TextField
        label="Services"
        placeholder="Type your available service here..."
        register={register}
        name="service3"
        errors={errors}
      />
      <div className="flex items-star my-4 flex-col gap-3">
        <label className="">
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            value={1}
            {...register('is_Verified')}
            name="is_Verified"
          />
          <span className="ml-2 text-black font-bold text-lg">
            By agreeing to this, you confirm that this place is an inclusive environment.
          </span>
        </label>
      </div>
      <PrimaryButton className="w-full justify-center py-4" disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </PrimaryButton>
    </form>
  );
};
