import { ServicesData } from '../../../core/constant';

export const Services = () => {
  return (
    <section id="services" className="w-full lg:p-36 h-full bg-indigo-50">
      <div className="p-14 lg:p-0 text-center lg:text-start">
        <div className="flex items-center justify-between">
          <div className="w-full flex items-center justify-center flex-col">
            <span className="text-2xl lg:text-4xl text-indigo-700 font-bold mb-4">Services we provide</span>
          </div>
        </div>
        {ServicesData.map(item => (
          <div key={item.id} className=" w-full flex items-center justify-center ">
            <article className="w-full rounded-xl mb-4 shadow-md bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 ">
              <div className="flex items-start sm:gap-8">
                <div
                  className="hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
                  aria-hidden="true"
                >
                  <div className="text-2xl text-indigo-700">{item.icon}</div>
                </div>
                <div>
                  <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 font-medium text-white">
                    {item.title}
                  </strong>

                  <h3 className="mt-4 text-lg font-bold sm:text-xl">
                    <span className="">{item.description}</span>
                  </h3>
                  <ol className="px-4 py-3">
                    <li className="mt-1 text-md text-gray-700">{item.subDescription2}</li>
                    <li className="mt-1 text-md text-gray-700">{item.subDescription3}</li>
                    <li className="mt-1 text-md text-gray-700">{item.subDescription4}</li>
                    <li className="mt-1 text-md text-gray-700">{item.subDescription1}</li>
                  </ol>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};
