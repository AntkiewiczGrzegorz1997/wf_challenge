import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
// import '../styles/Map.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// import { ChangeMapView } from './ChangeMapView.jsx';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { CreatedPost } from '../types/posts';
import '../styles/Map.css';
import { ChangeMapView } from './ChangeMapView';

// import mapData from '../data/countries.json';

// const geoJsonData: any = mapData as any;

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

export default function Map(/*{ mapCenter, geoJsonData, geoJsonKey }*/) {
  // const dispatch: AppDispatch = useDispatch();
  // console.log(mapData);

  const posts: CreatedPost[] = useSelector(
    (state: RootState) => state.post.posts
  );
  const selectedPosts: number[] = useSelector(
    (state: RootState) => state.post.selectedPosts
  );
  const mapCenter: L.LatLngExpression = useSelector(
    (state: RootState) => state.post.mapCenter
  );
  // const polygonStyle = {
  //   fillColor: '#3990f7',
  //   fillOpacity: 0.5,
  //   color: '#0a3259',
  // };
  // console.log(geoJsonData);

  //   const onEachObject = (object, layer) => {
  //     const [timestamp, name, user] = [
  //       object.properties.timestamp,
  //       object.properties.name,
  //       object.properties.user,
  //     ];

  //     const popupContent = `
  //     Timestamp: ${timestamp}<br>
  //     ${name ? `Name: ${name}<br>` : ``}
  //     User: ${user}<br>
  // `;

  //     layer.bindPopup(popupContent);
  //   };
  // const countryNames = Array.from(new Set(posts.map((post) => post.country)));

  // // Filter GeoJSON data to include only these countries
  // const filteredGeoJsonData = {
  //   ...geoJsonData,
  //   features: geoJsonData.features.filter((feature: any) =>
  //     countryNames.includes(feature.properties.ADMIN)
  //   ),
  // };

  // console.log('test', filteredGeoJsonData.features);
  console.log(posts);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <div className='map-container'>
      <MapContainer
        zoom={4}
        center={mapCenter}
        className='map'
        // style={{ height: '100%', width: '100%' }} /*className='map'*/
      >
        <ChangeMapView center={mapCenter} />

        {/* <ChangeMapView center={mapCenter} /> */}
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {posts &&
          posts.map(
            (post, index) =>
              selectedPosts &&
              post.lat &&
              post.long &&
              selectedPosts.includes(post.id) && (
                <Marker
                  key={index}
                  position={[parseFloat(post.lat), parseFloat(post.long)]}
                  icon={L.icon({
                    iconUrl:
                      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
                    shadowUrl:
                      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41],
                  })}
                >
                  <Popup className='popup'>
                    <img
                      alt='test'
                      src={post.image_url}
                      className='map-image'
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://placekitten.com/1000/700';
                        e.currentTarget.alt = 'default image';
                      }}
                    />
                    <br />
                    <strong>{post.title} </strong>
                    <br /> {post.content}
                  </Popup>
                </Marker>
              )
          )}
        {/* {filteredGeoJsonData.features.length > 0 && (
            <GeoJSON data={filteredGeoJsonData.features} />
          )} */}
      </MapContainer>
    </div>
  );
}
