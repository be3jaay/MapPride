import { LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { healthIcon, governmentIcon, safeSpaceIcon, supportIcon } from '../../../core/icons/marker-icons';
import { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import PrimaryButton from '@/Components/PrimaryButton';
import { GoStarFill } from 'react-icons/go';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useForm } from 'react-hook-form';
import { Badge } from '../Badge';

const MySwal = withReactContent(Swal);

export const Mapping = ({ auth }) => {
  const user = auth.user;
  if (!user) return null;
  const [places, setPlaces] = useState([]);
  const [selectMarker, setSelectMarker] = useState([]);
  const [ratings, setRatings] = useState({});
  const [averageRatings, setAverageRatings] = useState({});
  const [close, setClose] = useState(false);
  const [filter, setFilter] = useState(true);

  const handleFilter = () => {
    setFilter(prevVal => !prevVal);
  };
  const popupRef = useRef(null);
  const { reset } = useForm();

  const handleClose = () => {
    setClose(true);
  };

  const fetchPlaces = async () => {
    try {
      const response = await fetch(`/api/proxy/places?location=14.2127,121.162&radius=10000&keyword=LGBTQ+friendly`);
      const data = await response.json();
      if (data.results) {
        setPlaces(data.results);
      }
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  useEffect(() => {
    const fetchLayer = async () => {
      const response = await axios.get('/api/map/view-all');
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
    fetchPlaces();
  }, []);

  const getIcon = iconType => {
    switch (iconType) {
      case 'Healthcare Facilities':
        return healthIcon;
      case 'Government Services':
        return governmentIcon;
      case 'Support Association':
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

  const handleSubmitRatings = useCallback(async itemId => {
    try {
      const response = await axios.post(`/api/map/${itemId}/rate`, { rating_value: ratings[itemId] });

      if (response.status >= 200 && response.status < 300) {
        MySwal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Map rated successfully.',
        });

        if (popupRef.current) {
          popupRef.current._source.closePopup();
        }

        handleClose();
        reset();
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Unprocessable Content',
        text: 'You have not yet filled the star field',
      });
    }
  });

  return (
    <>
      <div className="">
        <div className=" flex gap-2 mb-4">
          <h3>Google Verified Places</h3>
          <input type="checkbox" className="toggle toggle-primary" defaultChecked onChange={handleFilter} />
        </div>
      </div>
      <MapContainer center={[14.2127, 121.1639]} zoom={14} scrollWheelZoom className="h-[47rem]">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LayersControl position="topright">
          {Object.keys(selectMarker).map(category => (
            <LayersControl.Overlay key={category.id} name={category} checked>
              <LayerGroup>
                {selectMarker[category].map(item => (
                  <Marker key={item.id} position={[item.longitude, item.latitude]} icon={getIcon(item.location)}>
                    <Popup ref={popupRef} className="w-full" closeOnClick={close}>
                      <div className="card bg-white w-[30rem] flex items-center justify-center">
                        <div>
                          <img src={`/storage/${item.image}`} aria-hidden alt="No Image" className="h-auto" />
                        </div>
                        <div className="w-full card-body shadow-lg relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 ">
                          <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                          <div className="sm:flex sm:justify-between sm:gap-4">
                            <div className="w-full">
                              <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-indigo-700 sm:text-xl">{item.title}</h3>
                                {item.usertype === 'admin' ? <Badge message="Verified" type="success" /> : null}
                              </div>
                              <p className="text-md">{item.description}</p>
                              <hr className="w-full mb-4" />
                            </div>
                          </div>
                          <div>
                            <span className="mb-2 text-pretty text-sm text-gray-700 font-bold flex items-center">
                              Address: {item.address}
                            </span>
                            <span className="mb-2 text-pretty text-sm text-gray-700 font-bold flex items-center">
                              Available Services:
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
          {places.map(item => (
            <>
              {filter && (
                <LayerGroup>
                  <Marker
                    key={item.place_id}
                    position={[item.geometry.location.lat, item.geometry.location.lng]}
                    icon={getIcon(item.types[0])}
                  >
                    <Popup ref={popupRef} className="w-full" closeOnClick={close}>
                      <div className="card bg-white w-[30rem] flex items-center justify-center">
                        <div>
                          {item.photos && item.photos.length > 0 && (
                            <img
                              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=AIzaSyByyiUUAKSdHaG02TAoeQp5_yq-qhq6Q-4`}
                              alt={item.name}
                              className="h-auto"
                            />
                          )}
                        </div>
                        <div className="w-full card-body shadow-lg relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 ">
                          <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                          <div className="sm:flex sm:justify-between sm:gap-4">
                            <div className="w-full">
                              <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-indigo-700 sm:text-xl">{item.name}</h3>
                                <Badge message="Verified" type="success" />
                              </div>
                              <p className="text-md">{item.vicinity}</p>
                              <hr className="w-full mb-4" />
                            </div>
                          </div>
                          <div>
                            <span className="mb-2 text-pretty text-sm text-gray-700 font-bold flex items-center">
                              Address: {item.vicinity}
                            </span>
                            <span className="mb-2 text-pretty text-sm text-gray-700 font-bold flex items-center">
                              Type: {item.types[0]}
                            </span>
                            <span className="mb-2 text-pretty text-sm text-gray-700 font-bold flex items-center">
                              Contact Number: {item.formatted_phone_number || 'N/A'}
                            </span>
                            <span className="mr-2 text-pretty text-xl text-indigo-700 font-bold flex items-center">
                              Ratings:{' '}
                              {item.rating ? (
                                <div className="flex flex-col">{item.rating.toFixed(1)}</div>
                              ) : (
                                'No ratings yet'
                              )}
                            </span>
                          </div>
                          <hr className="my-4" />
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                </LayerGroup>
              )}
            </>
          ))}
        </LayersControl>
      </MapContainer>
    </>
  );
};
