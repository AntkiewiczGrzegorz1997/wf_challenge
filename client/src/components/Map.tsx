import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import '../styles/Map.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// import { ChangeMapView } from './ChangeMapView.jsx';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { CreatedPost } from '../types/posts';
import '../styles/Map.css';

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

const customIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div style='background-color: #501e96;' class='marker-pin'></div>`,
  iconSize: [30, 42],
  iconAnchor: [15, 42],
});

export default function Map(/*{ mapCenter, geoJsonData, geoJsonKey }*/) {
  // const dispatch: AppDispatch = useDispatch();
  const posts: CreatedPost[] = useSelector(
    (state: RootState) => state.post.posts
  );
  const selectedPosts: number[] = useSelector(
    (state: RootState) => state.post.selectedPosts
  );
  const polygonStyle = {
    fillColor: '#3990f7',
    fillOpacity: 0.5,
    color: '#0a3259',
  };

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

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer
        zoom={5}
        center={[51.505, -0.09]}
        style={{ height: '100%', width: '100%' }} /*className='map'*/
      >
        {/* <ChangeMapView center={mapCenter} /> */}
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {posts.map(
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
                    className='mapImage'
                    onError={(e) => {
                      e.currentTarget.src = 'https://placekitten.com/100/70';
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
        {/* {geoJsonData && (
          <GeoJSON
            key={geoJsonKey}
            style={polygonStyle}
            data={geoJsonData.features}
            onEachFeature={onEachObject}
          />
        )} */}
      </MapContainer>
    </div>
  );
}
