import { LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { healthIcon } from '../../../core/icons/marker-icons';
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
          <LayersControl.Overlay key={index} name={item.location}>
            <LayerGroup>
              <Marker position={[item.longitude, item.latitude]} icon={healthIcon}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </LayerGroup>
          </LayersControl.Overlay>
        ))}
      </LayersControl>
    </MapContainer>
  );
};
