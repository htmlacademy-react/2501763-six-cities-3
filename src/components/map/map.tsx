import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { City, Offer } from '../../types/offer';
import { UrlMarker } from '../map/const';
import { CITY_LOCATIONS } from '../utils';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offer[];
  selectedOffer: Offer | undefined;
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

  const getCityCoords = (isOfferPage: boolean): City | undefined => {
    let city;
    if (isOfferPage && selectedOffer) {
      city = CITY_LOCATIONS.find((cityItem) => cityItem.name === selectedOffer.city.name);
    } else {
      city = CITY_LOCATIONS.find((item) => item.name === actualCity);
    }
    return city;
  };

  const activeCity = getCityCoords(isOfferPageMap);


  const mapRef = useRef(null);
  const map = useMap(mapRef, activeCity);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((item) => {
        const marker = new Marker({
          lat: item.location.latitude,
          lng: item.location.longitude
        });

        if (isOfferPageMap) {
          const selectedMarker = new Marker(
            selectedOffer !== undefined ? {
              lat: selectedOffer.location.latitude,
              lng: selectedOffer.location.longitude
            } : {
              lat: 0,
              lng: 0
            });
          selectedMarker
            .setIcon(currentCustomIcon)
            .addTo(markerLayer);
        }

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

  return <div style={{ height: '100%' }} ref={mapRef}></div>;
}
