export default function PageHeader({
  title,
  subtitle,
}) {
  return (
    <div className="mb-10">

      <h1 className="text-4xl font-bold text-gray-800">
        {title}
      </h1>

      {subtitle && (
        <p className="text-gray-500 mt-2">
          {subtitle}
        </p>
      )}

    </div>
  );
}