export default function Select({
  label,
  children,
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

      <select
        className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      >
        {children}
      </select>

    </div>
  );
}