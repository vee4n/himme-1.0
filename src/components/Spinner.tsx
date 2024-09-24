export function LoadingSpinner({ color }) {
  return (
    <svg
      className={`w-[1.2rem] h-[1.2rem] ${`text-${color}`}`}
      viewBox="0 0 30 30"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15zm0-4.5c5.799 0 10.5-4.701 10.5-10.5S20.799 4.5 15 4.5 4.5 9.201 4.5 15 9.201 25.5 15 25.5z"
        fill="currentColor"
        className={`text-opacity-20 ${`text-${color}`}`}
      ></path>
      <path
        d="M15 0C6.716 0 0 6.716 0 15h4.5C4.5 9.201 9.201 4.5 15 4.5V0z"
        fill="currentColor"
        className={`origin-center ${`text-${color}`} animate-spin`}
      />
    </svg>
  );
}
