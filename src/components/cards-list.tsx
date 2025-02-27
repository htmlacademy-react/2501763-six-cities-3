import {Offers} from '../types/offer';
import PlaceCard from './place-card';
import {useState} from 'react';

type CardsListProp = {
  offers: Offers;
}

export default function CardsList(props: CardsListProp): JSX.Element {
  const { offers } = props;
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleMouseOver = (id: string) => {
    setActiveCardId(id);
  };

  const handleMouseOut = () => {
    setActiveCardId(null);
  };

  return (
    <>
      {offers.map((item) => (
        <PlaceCard
          key={item.id}
          offer={item}
          onListItemHover={handleMouseOver}
          onListItemOut={handleMouseOut}
          isActive={activeCardId === item.id}
        />
      ))}
    </>
  );
}
