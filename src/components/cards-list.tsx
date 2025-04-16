import { Offers } from '../types/offer';
import PlaceCard from './place-card';

type CardsListProp = {
  offers: Offers;
}

export default function CardsList(props: CardsListProp): JSX.Element {
  const { offers } = props;
  return (
    <>
      {
        offers.map((item) => (<PlaceCard offer={item} key={item.id} />)
        )
      }
    </>
  );
}
