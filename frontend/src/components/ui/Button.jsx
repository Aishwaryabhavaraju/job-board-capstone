export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "px-5 py-2 rounded-lg font-medium transition duration-200";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300",

    success:
      "bg-green-600 text-white hover:bg-green-700",

    danger:
      "bg-red-600 text-white hover:bg-red-700",

    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}