import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {City, Offer} from '../../types/offer';
import {UrlMarker} from '../map/const';
import {CITY_LOCATIONS} from '../utils';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offer[];
  selectedOfferId: string | undefined;
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
  const { offers, selectedOfferId, actualCity, isOfferPageMap } = props;
  const selectedOffer = offers.find((offer) => offer.id === selectedOfferId);

  const getCityCoords = (isOfferPage:boolean):City| undefined=> {
    let city;
    if(isOfferPage && selectedOffer) {
      city = CITY_LOCATIONS.find((cityItem)=> cityItem.name === selectedOffer.city.name);
    } else {
      city = CITY_LOCATIONS.find((item)=> item.name === actualCity);
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
          lng: item.location.longitude,
        });

        const selectedMarker = selectedOffer ? new Marker({
          lat: selectedOffer.location.latitude,
          lng: selectedOffer.location.longitude,
        }) : null;

        if (isOfferPageMap && selectedMarker) {
          selectedMarker
            .setIcon(currentCustomIcon)
            .addTo(markerLayer);
        }

        marker
          .setIcon(
            selectedOfferId !== undefined && item.id === selectedOfferId && !isOfferPageMap
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOfferId, isOfferPageMap, selectedOffer]);

  return <div style={{ height: '100%' }} ref={mapRef}></div>;
}
