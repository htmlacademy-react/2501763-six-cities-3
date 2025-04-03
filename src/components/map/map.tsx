import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {City, Offer} from '../../types/offer';
import {UrlMarker, EMPTY_LOCATION} from '../map/const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offer[];
  selectedOfferId: string | undefined;
  actualCity: string;
  offerPageMap: boolean;
};

const defaultCustomIcon = new Icon({
  iconUrl: UrlMarker.DEFAULT,
});

const currentCustomIcon = new Icon({
  iconUrl: UrlMarker.CURRENT,
});

export default function Map(props: MapProps): JSX.Element {
  const { offers, selectedOfferId, actualCity, offerPageMap } = props;
  const cityOffer = offers.find((item) => item.city.name === actualCity);
  const selectedOffer = offers.find((offer) => offer.id === selectedOfferId);
  const getCityFromOffer = (offer: Offer | undefined): City => offer?.city ?? EMPTY_LOCATION;
  const activeCity = getCityFromOffer(cityOffer);
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

        if (offerPageMap && selectedMarker) {
          selectedMarker
            .setIcon(currentCustomIcon)
            .addTo(markerLayer);
        }

        marker
          .setIcon(
            selectedOfferId !== undefined && item.id === selectedOfferId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOfferId, offerPageMap, selectedOffer]);

  return <div style={{ height: '100%' }} ref={mapRef}></div>;
}
