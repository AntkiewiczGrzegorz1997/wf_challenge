import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { CreatedPost } from '../types/posts';
import '../styles/Map.css';
import { ChangeMapView } from './ChangeMapView';
import { formatDate } from '../utils/formatDate';

export default function Map(): JSX.Element {
  const posts: CreatedPost[] = useSelector(
    (state: RootState) => state.post.posts
  );
  const selectedPosts: number[] = useSelector(
    (state: RootState) => state.post.selectedPosts
  );
  const mapCenter: L.LatLngExpression = useSelector(
    (state: RootState) => state.post.mapCenter
  );

  useEffect(() => {}, [posts]);

  return (
    <div className='map-container'>
      <MapContainer zoom={5} center={mapCenter} className='map'>
        <ChangeMapView center={mapCenter} />
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
                    <br /> {'Created on:'} {formatDate(post.created_at)}
                  </Popup>
                </Marker>
              )
          )}
      </MapContainer>
    </div>
  );
}
