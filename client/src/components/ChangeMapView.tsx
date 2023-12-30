import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

type ObjectCenter = {
  center: L.LatLngExpression;
};

export function ChangeMapView({ center }: ObjectCenter) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center);
    }
  }, [center, map]);

  return null;
}
