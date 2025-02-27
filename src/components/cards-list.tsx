import {Offers} from '../types/offer';
import PlaceCard from './place-card';
import {useState} from 'react';

type CardsListProp = {
  offers: Offers;
  onListItemHover: (listItemId: string) => void;
  onListItemOut: () => void;
}

export default function CardsList(props: CardsListProp): JSX.Element {
  const {offers, onListItemHover, onListItemOut} = props;
  const [activeCardId, ] = useState<string | null>(null);

  return (
    <>
      {offers.map((item) => (
        <PlaceCard
          key={item.id}
          offer={item}
          onListItemHover={onListItemHover}
          onListItemOut={onListItemOut}
          isActive={activeCardId === item.id}
        />
      ))}
    </>
  );
}
