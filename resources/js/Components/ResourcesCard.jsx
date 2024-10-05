import PrimaryButton from './PrimaryButton';

const CardContent = ({ item, book, formatDate }) => {
  return (
    <div className="card-body bg-white shadow-lg cursor-pointer relative overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 hover:scale-90 transition-all  flex flex-col justify-between">
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
      <div>
        <div className="sm:flex sm:justify-between sm:gap-4">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">{item.title}</h3>
            <img src={book} alt="" className="w-14 h-14" />
          </div>
        </div>
        <div className="my-4">
          <p className="text-sm text-gray-500 h-40 overflow-hidden text-ellipsis">{item.description}</p>
        </div>
      </div>
      <div>
        <span>Updated at: {formatDate(item.updated_at)}</span>
        <PrimaryButton className="w-full text-white justify-center py-3 mt-6">Read More</PrimaryButton>
      </div>
    </div>
  );
};
export const ResourcesCard = ({ item, book, formatDate }) => {
  return (
    <a href={item.url_link} target="_blank " rel="noreferrer">
      <div className="card w-full ">
        <CardContent item={item} book={book} formatDate={formatDate} />
      </div>
    </a>
  );
};
