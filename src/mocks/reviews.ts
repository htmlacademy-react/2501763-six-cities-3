import {Review} from '../types/review';

export const reviews:Review[] = [
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4
  },
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b622',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Angelina Petrova',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false
    },
    comment: 'A quiet cozy and picturesque.',
    rating: 1
  },
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b623',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Fedor Conner',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false
    },
    comment: 'cozy and picturesque',
    rating:10
  },
];
