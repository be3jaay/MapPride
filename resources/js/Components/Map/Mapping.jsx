import { LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { healthIcon, governmentIcon, safeSpaceIcon, supportIcon } from '../../../core/icons/marker-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Mapping = () => {
  const [selectMarker, setSelectMarker] = useState([]);

  useEffect(() => {
    const fetchLayer = async () => {
      const markerResponse = await axios.get('/api/marker-location');
      const markerLocation = markerResponse.data.data;
      setSelectMarker(markerLocation);
    };
    fetchLayer();
  }, []);

  return (
    <MapContainer center={[14.2127, 121.1639]} zoom={16} scrollWheelZoom={false} className="h-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LayersControl position="topright">
        {selectMarker.map((item, index) => (
          <LayersControl.Overlay key={index} name={item.location} checked>
            <LayerGroup>
              <Marker position={[item.longitude, item.latitude]} icon={safeSpaceIcon}>
                <Popup>
                  <a href="#" className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
                    <img src={item.location_image} alt="no-image" />
                    <div className="mt-2">
                      <dl>
                        <div>
                          <dt className="sr-only">Price</dt>
                          <dd className="text-sm text-gray-500">{item.location_title}</dd>
                        </div>
                        <div>
                          <dt className="sr-only">Address</dt>
                          <dd className="font-medium">{item.location_description}</dd>
                        </div>
                      </dl>
                      <div className="mt-6 flex items-center gap-8 text-xs">
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                          <svg
                            className="size-4 text-indigo-700"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                            />
                          </svg>

                          <div className="mt-1.5 sm:mt-0">
                            <p className="text-gray-500">Services Available</p>

                            <p className="font-medium">{item.location_services}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </Popup>
              </Marker>
            </LayerGroup>
          </LayersControl.Overlay>
        ))}
      </LayersControl>
    </MapContainer>
  );
};
