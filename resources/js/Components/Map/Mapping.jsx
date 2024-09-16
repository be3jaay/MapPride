import { LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { healthIcon, governmentIcon, safeSpaceIcon, supportIcon } from '../../../core/icons/marker-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa6';
import { FaRegHeart } from 'react-icons/fa';

export const Mapping = () => {
  const [selectMarker, setSelectMarker] = useState([]);

  useEffect(() => {
    const fetchLayer = async () => {
      const response = await axios.get('/api/map');
      const markerLocation = response.data.data ?? [];

      const groupedMarkers = markerLocation.reduce((acc, marker) => {
        const category = marker.location;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(marker);
        return acc;
      }, {});

      setSelectMarker(groupedMarkers);
    };

    fetchLayer();
  }, []);

  const getIcon = iconType => {
    switch (iconType) {
      case 'Healthcare Facilities':
        return healthIcon;
      case 'Government Services':
        return governmentIcon;
      case 'Support Services':
        return supportIcon;
      default:
        return safeSpaceIcon;
    }
  };

  return (
    <MapContainer center={[14.2127, 121.1639]} zoom={16} scrollWheelZoom={false} className="h-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LayersControl position="topright">
        {Object.keys(selectMarker).map((category, index) => (
          <LayersControl.Overlay key={index} name={category} checked>
            <LayerGroup>
              {selectMarker[category].map((item, i) => (
                <Marker key={i} position={[item.longitude, item.latitude]} icon={getIcon(item.location)}>
                  <Popup className="w-full">
                    <div className="card bg-white w-[24rem] flex items-center justify-center">
                      <div>
                        <img src={`/storage/${item.image}`} alt="No image" className="h-auto" />
                      </div>
                      <div className="w-full card-body shadow-lg relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 ">
                        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                        <div className="sm:flex sm:justify-between sm:gap-4">
                          <div className="w-full">
                            <div className="flex items-center justify-between">
                              <h3 className="text-xl font-bold text-indigo-700 sm:text-xl">{item.title}</h3>
                              <FaRegHeart className="text-3xl cursor-pointer " />
                            </div>
                            <p className="text-md">{item.description}</p>
                            <hr className="w-full mb-4" />
                          </div>
                        </div>
                        <div>
                          <span className="mb-2 text-pretty text-sm text-indigo-700 flex items-center">
                            {item.address}
                          </span>
                          <span className="mb-2 text-pretty text-sm text-indigo-700 flex items-center">
                            {item.services}
                          </span>
                          <span className="mb-2 text-pretty text-sm text-indigo-700 flex items-center">
                            +63 {item.phone}
                          </span>
                        </div>
                        <hr className="my-4" />

                        <span className="flex items-center font-bold text-gray-600">
                          <FaHeart className="text-3xl cursor-pointer text-red-400 mr-2 " />
                          324 users like this location
                        </span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
        ))}
      </LayersControl>
    </MapContainer>
  );
};
