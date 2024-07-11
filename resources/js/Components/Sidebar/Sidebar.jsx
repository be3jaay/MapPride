import { SidebarData } from '../../../core/constant';

export const Sidebar = () => {
  return (
    <nav className={'w-76 absolute h-screen bg-slate-600 text-black flex flex-col shadow-xl'}>
      <div className=" flex-col">
        <h1 className="text-xl font-semibold my-6 text-white px-10 ">Map-Pride 🏳️‍🌈</h1>
        <hr />
      </div>
      <ul className="w-full">
        {SidebarData.map((item, index) => (
          <li
            key={index}
            href={item.path}
            className="w-full flex items-center text-white justify-start px-10 py-6 cursor-pointer"
          >
            <span className="text-lg mr-6">{item.icon}</span>
            <span className="text-lg font-semibold">{item.title}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};
