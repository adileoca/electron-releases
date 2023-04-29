export default function TaskButton({ name, number, status }) {
  return (
    <button className="w-full rounded-md bg-white text-left shadow-sm focus:outline focus:outline-blue-600 focus:ring-4 focus:ring-blue-400">
      <div className="relative flex items-center justify-between overflow-hidden p-3">
        <div>
          <h1 className="inline font-semibold text-neutral-900 ">{name}</h1>
          <span className="inline font-normal text-neutral-500">
            &nbsp;/ {number}
          </span>
        </div>
        {status && (
          <span className="inline-flex items-center gap-x-1.5 rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
            <svg
              className="h-1.5 w-1.5 fill-red-500"
              viewBox="0 0 6 6"
              aria-hidden="true"
            >
              <circle cx={3} cy={3} r={3} />
            </svg>
            Urgent
          </span>
        )}
      </div>
    </button>
  );
}
