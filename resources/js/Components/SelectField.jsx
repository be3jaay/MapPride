import { useState } from 'react';
import { FaRetweet } from 'react-icons/fa';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

const SelectInput = ({ name, options, errors, setValue }) => {
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const handleSelectChange = e => {
    const value = e.target.value;
    if (value === 'other') {
      setIsOtherSelected(true);
      setValue(name, '');
    } else {
      setIsOtherSelected(false);
      setValue(name, value);
    }
  };

  const handleTextChange = e => {
    setValue(name, e.target.value);
  };

  const backToSelect = () => {
    setIsOtherSelected(!isOtherSelected);
  };

  return (
    <div>
      {isOtherSelected ? (
        <div className="flex items-center gap-2">
          <TextInput
            id={name}
            name={name}
            className="block w-full border px-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md bg-white h-14 text-black mt-1 mb-3"
            autoComplete={name}
            onChange={handleTextChange}
            required
          />
          <button className="text-xl text-indigo-700" onClick={backToSelect}>
            <FaRetweet />
          </button>
        </div>
      ) : (
        <select
          name={name}
          id={name}
          className="block w-full px-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md bg-white h-14 text-black mt-1 mb-3"
          required
          onChange={handleSelectChange}
        >
          <option value="" disabled selected>
            Select Type
          </option>
          {options.map(option => (
            <option key={option.id} value={option}>
              {option}
            </option>
          ))}
          <option value="other">Other</option>
        </select>
      )}
      <InputError message={errors[name]?.message} />
    </div>
  );
};

export default SelectInput;
