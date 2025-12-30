export type Day = {
  day: number;
  date: string;
  location: string;
  description: string;
  icon: string;
};

export type ItinerarySectionProps = {
  days: Day[];
  currentDay: number;
  onChangeDay: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
};
