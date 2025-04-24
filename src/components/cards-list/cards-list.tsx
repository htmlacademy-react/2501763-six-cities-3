import { Offers } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type CardsListProp = {
  offers: Offers;
  isNearList: boolean;
}

export default function CardsList(props: CardsListProp): JSX.Element {
  const { offers, isNearList } = props;
  return (
    <>
      {
        offers.map((item) => (<PlaceCard offer={item} key={item.id} isNearCard={isNearList} />)
        )
      }
    </>
  );
}
