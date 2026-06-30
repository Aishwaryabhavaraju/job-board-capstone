export default function Input({
  label,
  className = "",
  ...props
}) {
  return (
    <div>

      {label && (
        <label className="block mb-2 font-medium">
          {label}
        </label>
      )}

      <input
        className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />

    </div>
  );
}