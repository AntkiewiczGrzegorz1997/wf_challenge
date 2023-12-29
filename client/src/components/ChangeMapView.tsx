import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export function ChangeMapView({ center }: any) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center);
    }
  }, [center, map]);

  return null;
}
