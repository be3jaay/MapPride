import { ServicesData } from '../../../core/constant';

export const Services = () => {
  return (
    <section id="services" className="w-full lg:p-36 h-full bg-white">
      <div className="p-14 lg:p-0 text-center lg:text-start">
        <div className="flex items-center justify-between">
          <div className="w-full flex items-center justify-center flex-col">
            <span className="text-2xl lg:text-4xl text-indigo-700 font-bold mb-4">Services we provide</span>
          </div>
        </div>
        <ServicesData />
      </div>
    </section>
  );
};
