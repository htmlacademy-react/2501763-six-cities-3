import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { City, Offer } from '../../types/offer';
import { UrlMarker } from '../map/const';
import { CITY_LOCATIONS } from '../utils';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offer[];
  selectedOffer?: Offer;
  actualCity?: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: UrlMarker.DEFAULT,
});

const currentCustomIcon = new Icon({
  iconUrl: UrlMarker.CURRENT,
});

export default function Map(props: MapProps): JSX.Element {
  const { offers, selectedOffer, actualCity } = props;

  const getCityCoords = (): City | undefined => {
    const cityName = selectedOffer?.city.name || actualCity;
    return CITY_LOCATIONS.find((item) => item.name === cityName);
  };

  const activeCity = getCityCoords();

  const mapRef = useRef(null);
  const map = useMap(mapRef, activeCity);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((item) => {
        const marker = new Marker({
          lat: item.location.latitude,
          lng: item.location.longitude
        },{ alt: 'pin-image'});

        marker
          .setIcon(
            selectedOffer && item.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      if (selectedOffer) {
        const selectedMarker = new Marker({
          lat: selectedOffer.location.latitude,
          lng: selectedOffer.location.longitude
        });
        selectedMarker
          .setIcon(currentCustomIcon)
          .addTo(markerLayer);
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);

  return <div data-testid= "map-id" style={{ height: '100%' }} ref={mapRef}></div>;
}
