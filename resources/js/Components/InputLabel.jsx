export default function InputLabel({ value, className = '', children, ...props }) {
  return (
    <label {...props} className={`block font-medium text-md text-black ` + className}>
      {value ? value : children}
    </label>
  );
}
