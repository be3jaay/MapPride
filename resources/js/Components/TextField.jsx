import InputError from './InputError';

export const TextField = ({ label, placeholder, register, name, errors, ...rest }) => {
  return (
    <div>
      <label className="input border-black w-full p-4 h-14 bg-white flex items-center gap-2 my-4 text-black font-bold">
        {label}
        <input
          type="text"
          className="input w-full bg-transparent my-2"
          placeholder={placeholder}
          {...register(name)}
          {...rest}
        />
      </label>
      {errors[name] && <InputError message={errors[name]?.message} />}
    </div>
  );
};
