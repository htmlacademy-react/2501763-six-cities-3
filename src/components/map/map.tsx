import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {City, Offers, Offer} from '../../types/offer';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT, EMPTY_LOCATION} from '../map/const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offers;
  selectedOffer: Offer | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export default function Map(props: MapProps): JSX.Element {
  const {offers, selectedOffer} = props;

  const selectedCity = 'Amsterdam';

  const offer = offers.find((item)=> item.city.name === selectedCity);

  const getCityFromOffer = (somePin:Offer|undefined):City=> {
    if(somePin) {
      const city = somePin.city;
      return city;
    }
    return EMPTY_LOCATION;
  };

  const mapRef = useRef(null);
  const map = useMap(mapRef, getCityFromOffer(offer));

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((item) => {
        const marker = new Marker({
          lat: item.location.latitude,
          lng: item.location.longitude
        });

        marker
          .setIcon(
            selectedOffer !== undefined && item.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}
