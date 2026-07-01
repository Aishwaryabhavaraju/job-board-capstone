import Button from "./Button";

export default function EmptyState({
  title,
  message,
  buttonText,
  onClick,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">

      {/* Icon */}
      <div className="text-7xl mb-5">
        📭
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800">
        {title}
      </h2>

      {/* Message */}
      <p className="text-gray-500 mt-3 max-w-md">
        {message}
      </p>

      {/* Optional Button */}
      {buttonText && (
        <Button
          className="mt-6"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      )}

    </div>
  );
}