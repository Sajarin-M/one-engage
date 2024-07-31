export type LoginDto = {
  email: string;
  password: string;
};

export type LoginVm = {
  token: string;
};

export type AdminAccessTokenData = {
  id: string;
  email: string;
  fullName: string;
};

export type ImageVm = {
  name: string;
  altText: string;
  width: number;
  height: number;
  blurUrl: string;
  size: number;
};

export type ImageUploadVm = {
  name: string;
  width: number;
  height: number;
  blurUrl: string;
  size: number;
};

export type SliderVm = {
  id: string;
  title: string;
  image: ImageVm;
};

export type CreateSliderDto = {
  title: string;
  image: ImageVm;
};

export type EditSliderDto = CreateSliderDto & { id: string };

export type PageContentVm = {
  title: string;
  subtitle: string;
  buttonLabel: string;
  image: ImageVm;
  visible: boolean;
};

export type EditPageContentDto = {
  title: string;
  subtitle: string;
  buttonLabel: string;
  image: ImageVm;
};

export type ChangeVisibilityDto = {
  visible: boolean;
};

export type WhoWeAreVm = {
  title: string;
  subtitle: string;
  description: string;
  buttonLabel: string;
  image: ImageVm;
  visible: boolean;
};

export type EditWhoWeAreDto = {
  title: string;
  subtitle: string;
  description: string;
  buttonLabel: string;
  image: ImageVm;
};

export type WhatWeOfferVm = {
  title: string;
  subtitle: string;
  description: string;
  image: ImageVm;
  visible: boolean;
};

export type EditWhatWeOfferDto = {
  title: string;
  subtitle: string;
  description: string;
  image: ImageVm;
};

export type UnlockYourWorldVm = {
  title: string;
  buttonLabel: string;
  buttonLink: string;
  image: ImageVm;
  visible: boolean;
};

export type EditUnlockYourWorldDto = {
  title: string;
  buttonLabel: string;
  buttonLink: string;
  image: ImageVm;
};
export type NoMattersVm = {
  title: string;
  subtitle: string;
  visible: boolean;
};

export type EditNoMattersDto = {
  title: string;
  subtitle: string;
};

export type HomePageContentVm = {
  sliders: {
    id: string;
    title: string;
    image: ImageVm;
  }[];
  pageContent: {
    title: string;
    image: ImageVm;
    subtitle: string;
    buttonLabel: string;
  } | null;
  whoWeAre: {
    title: string;
    subtitle: string;
    buttonLabel: string;
    description: string;
    image: ImageVm;
  } | null;
  whatWeOffer: {
    title: string;
    subtitle: string;
    description: string;
    image: ImageVm;
  } | null;
};
