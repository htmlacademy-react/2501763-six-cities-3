import Main from '../pages/main/main';

type AppProps = {
  dataMain: {
     RentalOffers: number;
   };
}

export default function App({ dataMain }: AppProps): JSX.Element {
  return (
    <Main dataMain={dataMain} />
  );
}
