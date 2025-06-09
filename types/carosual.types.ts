export interface CarouselItem {
  id: number | string;
  title: string;
  subtitle: string;
  description: string;
}

export interface InfiniteCarouselProps {
  items: CarouselItem[];
  title?: string;
  speed?: number;
  pauseOnHover?: boolean;
  backgroundColor?: string;
  cardBackgroundColor?: string;
  titleColor?: string;
  textColor?: string;
  mainTitleColor?: string;
  gap?: number;
}
