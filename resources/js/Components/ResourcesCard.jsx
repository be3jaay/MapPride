import { Badge } from './Badge';
import PrimaryButton from './PrimaryButton';

export const ResourcesCard = ({ item, book, formatDate }) => {
  return (
    <a href={item.url_link} target="_blank" rel="noopener noreferrer">
      <div className="card bg-white w-full cursor-pointer hover:scale-90 transition-all">
        <div className="card-body shadow-lg cursor-pointer relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 ">
          <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
          <div className="sm:flex sm:justify-between sm:gap-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl">{item.title}</h3>
              </div>
              <img src={book} alt="" className="w-14 h-14" />
            </div>
          </div>
          <div className="my-4">
            <p className="text-sm text-gray-500 h-40 overflow-hidden text-ellipsis">{item.description}</p>
            <div className="gap-2 flex items-center mt-4">
              <Badge message={item.author} type="info" />
              <Badge message={item.type} type="info" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span>Updated at: {formatDate(item.updated_at)}</span>
          </div>
          <PrimaryButton className="w-full text-white justify-center py-3 mt-6 ">View Here</PrimaryButton>
        </div>
      </div>
    </a>
  );
};
