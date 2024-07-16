export const Tabs = () => {
  return (
    <div className="my-2">
      <div className="sm:hidden">
        <label htmlFor="Tab" className="sr-only">
          Tab
        </label>

        <select id="Tab" className="w-full rounded-md border-indigo-300">
          <option>Settings</option>
          <option>Messages</option>
          <option>Archive</option>
          <option select>Notifications</option>
        </select>
      </div>

      <div className="hidden sm:block">
        <div className="border-b border-indigo-300">
          <nav className="-mb-px flex gap-6">
            <a
              href="#"
              className="shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Skills
            </a>

            <a
              href="#"
              className="shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Skills 2
            </a>

            <a
              href="#"
              className="shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Skills 3
            </a>

            <a
              href="#"
              className="shrink-0 rounded-t-lg border border-indigo-300 border-b-white p-3 text-sm font-medium text-sky-600"
            >
              Skills 4
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};
