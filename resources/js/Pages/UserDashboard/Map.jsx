import { Alert } from '@/Components/Alert';
import { Mapping } from '@/Components/Map/Mapping';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { iconMap } from '../../../core/constant';

export default function UserMap({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Dashboard" />

      <div className="py-12 px-8">
        <div className="w-full">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <Alert
              type="info"
              message="Mapping Content"
              icon={iconMap.map((item, index) => (
                <div key={index} className="tooltip tooltip-bottom" data-tip={item.tip}>
                  <img src={item.image} alt="" className="w-8 h-8" />
                </div>
              ))}
              description="In this section, you will be able to see all inclusive environments, such as safe spaces, health care services, government services, etc."
            />
          </div>

          <div className="w-full h-[44rem] mt-4">
            <Mapping auth={auth} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
