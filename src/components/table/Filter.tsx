export function Filter({ filter, setFilter }) {
  return (
    <div className="relative">
      <input
        className="p-2 border rounded w-full"
        placeholder="Search"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
      <i className="absolute right-0 mt-3 mr-2 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </i>
    </div>
  );
}
