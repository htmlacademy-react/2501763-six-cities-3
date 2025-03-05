import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {City, Offers, Offer} from '../../types/offer';
import {UrlMarker, EMPTY_LOCATION} from '../map/const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offers;
  selectedOfferId: string | undefined;
  mapWidth: string;
  mapHeight: string;
  mapMargin: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: UrlMarker.DEFAULT,
});

const currentCustomIcon = new Icon({
  iconUrl: UrlMarker.CURRENT,
});

export default function Map(props: MapProps): JSX.Element {
  const {offers, selectedOfferId, mapWidth, mapHeight, mapMargin} = props;

  const selectedCity = 'Amsterdam';

  const selectedOffer = offers.find((item) => item.city.name === selectedCity);

  const getCityFromOffer = (offer: Offer | undefined): City => offer?.city ?? EMPTY_LOCATION;

  const mapRef = useRef(null);
  const map = useMap(mapRef, getCityFromOffer(selectedOffer));

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((item) => {
        const marker = new Marker({
          lat: item.location.latitude,
          lng: item.location.longitude,
        });

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
  }, [map, offers, selectedOfferId]);

  return <div style={{height: mapHeight, width:mapWidth, margin: mapMargin}} ref={mapRef}></div>;
}
