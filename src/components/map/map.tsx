import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { City, Offer, ExtendedOffer } from '../../types/offer';
import { UrlMarker } from '../map/const';
import { CITY_LOCATIONS } from '../utils';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offer[];
  selectedOffer?: Offer | ExtendedOffer;
  actualCity?: string;
  isOfferPageMap: boolean;
};

const defaultCustomIcon = new Icon({
  iconUrl: UrlMarker.DEFAULT,
});

const currentCustomIcon = new Icon({
  iconUrl: UrlMarker.CURRENT,
});

export default function Map(props: MapProps): JSX.Element {
  const { offers, selectedOffer, actualCity, isOfferPageMap } = props;

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
      if (isOfferPageMap) {
        const selectedMarker = new Marker(
          selectedOffer !== undefined ? {
            lat: selectedOffer.city.location.latitude,
            lng: selectedOffer.city.location.longitude
          } : {
            lat: 0,
            lng: 0
          });
        selectedMarker
          .setIcon(currentCustomIcon)
          .addTo(markerLayer);
      }
      offers.map((item) => {
        const marker = new Marker({
          lat: item.location.latitude,
          lng: item.location.longitude
        }, { alt: 'pin-image' });


        marker
          .setIcon(
            selectedOffer !== undefined && item.id === selectedOffer.id && !isOfferPageMap
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer, isOfferPageMap]);

  return <div data-testid="map-id" style={{ height: '100%' }} ref={mapRef}></div>;
}
