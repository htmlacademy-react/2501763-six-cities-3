import Main from '../pages/main/main';

type AppProps = {
  data: {
    rentalOffersAmount: number;
   };
}

export default function App({ data }: AppProps): JSX.Element {
  return (
    <Main data={data} />
  );
}
