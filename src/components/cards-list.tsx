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
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleMouseHover = (id: string) => {
    setActiveCardId(id);
    onListItemHover(id);
  };

  const handleMouseOut = () => {
    setActiveCardId(null);
    onListItemOut();
  };

  return (
    <>
      {offers.map((item) => (
        <PlaceCard
          key={item.id}
          offer={item}
          onListItemHover={() => handleMouseHover(item.id)}
          onListItemOut={handleMouseOut}
          isActive={activeCardId === item.id}
        />
      ))}
    </>
  );
}
