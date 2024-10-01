import { LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { healthIcon, governmentIcon, safeSpaceIcon, supportIcon } from '../../../core/icons/marker-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PrimaryButton from '@/Components/PrimaryButton';
import { useToastNotifications } from '../../../core/hooks';
import { GoStarFill } from 'react-icons/go';

export const Mapping = ({ auth }) => {
  const user = auth.user;
  if (!user) return null;

  const [selectMarker, setSelectMarker] = useState([]);
  const [ratings, setRatings] = useState({});
  const [averageRatings, setAverageRatings] = useState({});
  const { notifyError, notifySuccess } = useToastNotifications();

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

      // Fetch average ratings for each map
      const averageRatingPromises = markerLocation.map(async marker => {
        const avgResponse = await axios.get(`/api/map/${marker.id}/rate`);
        return { id: marker.id, average_rating: avgResponse.data.average_rating };
      });

      const averageRatingsData = await Promise.all(averageRatingPromises);
      const averageRatingsMap = averageRatingsData.reduce((acc, { id, average_rating }) => {
        acc[id] = average_rating;
        return acc;
      }, {});

      setAverageRatings(averageRatingsMap);
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

  const handleRatingChange = (itemId, rating) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [itemId]: rating,
    }));
  };

  const handleSubmitRatings = async itemId => {
    try {
      const response = await axios.post(`/api/map/${itemId}/rate`, { rating_value: ratings[itemId] });
      if (response.status === 200) {
        notifySuccess('Successfully submitted the ratings');
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error submitting ratings:', error);
      notifyError('Failed to submit the ratings. Please try again.');
    }
  };

  return (
    <>
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
                      <div className="card bg-white w-[30rem] flex items-center justify-center">
                        <div>
                          <img src={`/storage/${item.image}`} alt="No image" className="h-auto" />
                        </div>
                        <div className="w-full card-body shadow-lg relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 ">
                          <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                          <div className="sm:flex sm:justify-between sm:gap-4">
                            <div className="w-full">
                              <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-indigo-700 sm:text-xl">{item.title}</h3>
                              </div>
                              <p className="text-md">{item.description}</p>
                              <hr className="w-full mb-4" />
                            </div>
                          </div>
                          <div>
                            <span className="mb-2 text-pretty text-sm text-gray-700 font-bold flex items-center">
                              Adderss: {item.address}
                            </span>
                            <span className="mb-2 text-pretty text-sm text-gray-700 font-bold flex items-center">
                              Available Services: {item.services}
                            </span>
                            <span className="mb-2 text-pretty text-sm text-gray-700 font-bold flex items-center">
                              Contact Number: +63 {item.phone}
                            </span>
                            <span className="mr-2 text-pretty text-xl text-indigo-700 font-bold flex items-center">
                              Ratings:{' '}
                              {averageRatings[item.id] != null && !isNaN(Number(averageRatings[item.id])) ? (
                                <span className="flex items-center ml-2">
                                  {Number(averageRatings[item.id]).toFixed(1)}
                                  <GoStarFill className="ml-2" />
                                </span>
                              ) : (
                                'No ratings yet'
                              )}
                            </span>
                          </div>
                          <hr className="my-4" />
                          <div className="rating rating-lg flex items-center justify-center my-2">
                            {[1, 2, 3, 4, 5].map(star => (
                              <input
                                key={star}
                                type="radio"
                                value={star}
                                className="mask mask-star-2 bg-indigo-700"
                                checked={ratings[item.id] === star}
                                onChange={() => handleRatingChange(item.id, star)}
                              />
                            ))}
                          </div>
                          <div className="flex justify-center mt-4">
                            <PrimaryButton onClick={() => handleSubmitRatings(item.id)}>Submit Ratings</PrimaryButton>
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
    </>
  );
};
