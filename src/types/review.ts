export type Review = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
};

export type Reviews = Review[];

export type NewComment = {
  pageId: string;
  comment: string;
  rating: number;
  formRef: HTMLFormElement | null;
}
