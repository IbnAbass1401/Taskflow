import { useState } from "react";

export default function Field({ label, id, type = "text", ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-base font-medium lg:mb-1.5 lg:text-sm">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          {...props}
          type={isPassword && show ? "text" : type}
          className={`w-full rounded-xl border border-frost bg-white px-4 py-4 text-lg outline-none transition duration-150 placeholder:text-navy/40 hover:border-sky focus:border-royal focus:ring-4 focus:ring-sky/30 disabled:bg-mist disabled:text-navy/60 disabled:hover:border-frost lg:rounded-lg lg:py-2.5 lg:text-sm ${
            isPassword ? "pr-12" : ""
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex items-center px-4 text-navy/50 transition duration-150 hover:text-royal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {show ? (
                <>
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" x2="22" y1="2" y2="22" />
                </>
              ) : (
                <>
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}