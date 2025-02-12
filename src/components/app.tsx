import Main from '../pages/main/main';

type AppProps = {
    rentalOffersAmount: number;
}

export default function App({rentalOffersAmount}: AppProps): JSX.Element {
  return (
    <Main rentalOffersAmount={rentalOffersAmount} />
  );
}
