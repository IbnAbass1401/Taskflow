export default function Field({ label, id, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={id}
        {...props}
        className="w-full rounded-lg border border-frost bg-white px-4 py-3 text-base outline-none transition duration-150 placeholder:text-navy/40 hover:border-sky focus:border-royal focus:ring-4 focus:ring-sky/30 lg:py-2.5 lg:text-sm"
      />
    </div>
  );
}