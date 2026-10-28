export default function Field({ label, id, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-base font-medium lg:mb-1.5 lg:text-sm">
        {label}
      </label>
      <input
        id={id}
        name={id}
        {...props}
        className="w-full rounded-xl border border-frost bg-white px-4 py-4 text-lg outline-none transition duration-150 placeholder:text-navy/40 hover:border-sky focus:border-royal focus:ring-4 focus:ring-sky/30 lg:rounded-lg lg:py-2.5 lg:text-sm"
      />
    </div>
  );
}