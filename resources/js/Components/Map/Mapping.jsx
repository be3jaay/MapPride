import { LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { healthIcon, governmentIcon, safeSpaceIcon, supportIcon } from '../../../core/icons/marker-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { FaPhone } from 'react-icons/fa6';
import { Badge } from '../Badge';

export const Mapping = () => {
  const [selectMarker, setSelectMarker] = useState([]);

  useEffect(() => {
    const fetchLayer = async () => {
      const response = await axios.get('/api/map');
      const markerLocation = response.data ?? [];

      // Group markers by location (or any other unique property) to avoid duplicates
      const groupedMarkers = markerLocation.reduce((acc, marker) => {
        const locationKey = `${marker.longitude}-${marker.latitude}`; // Unique key for grouping

        if (!acc[locationKey]) {
          acc[locationKey] = [];
        }
        acc[locationKey].push(marker);
        return acc;
      }, {});

      // Convert grouped data to an array for rendering
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
        {Object.keys(selectMarker).map((locationKey, index) => (
          <LayersControl.Overlay key={index} name={selectMarker[locationKey][0].location} checked>
            <LayerGroup>
              {selectMarker[locationKey].map((item, idx) => (
                <Marker key={idx} position={[item.longitude, item.latitude]} icon={getIcon(item.location)}>
                  <Popup className="w-full">
                    <div key={idx} className="card bg-white w-[24rem] flex items-center justify-center">
                      <div>
                        <img src={`/storage/${item.image}`} alt="No image" className="h-auto" />
                      </div>
                      <div className="w-full card-body shadow-lg cursor-pointer relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 ">
                        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                        <div className="sm:flex sm:justify-between sm:gap-4">
                          <div className="w-full">
                            <Badge type="info" message={item.location} className="text-md mb-2 " />
                            <h3 className="text-xl font-bold text-indigo-700 sm:text-xl">{item.title}</h3>
                            <p className="text-md">{item.description}</p>
                            <hr className="w-full mb-4" />
                          </div>
                        </div>
                        <div>
                          <span className="mb-2 text-pretty text-sm text-indigo-700 flex items-center">
                            <FaMapMarkerAlt className="mr-3" /> {item.address}
                          </span>
                          <span className="mb-2 text-pretty text-sm text-indigo-700 flex items-center">
                            <RiCustomerService2Fill className="mr-3" /> {item.services}
                          </span>
                          <span className="mb-2 text-pretty text-sm text-indigo-700 flex items-center">
                            <FaPhone className="mr-3" /> +63 {item.phone}
                          </span>
                        </div>
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
