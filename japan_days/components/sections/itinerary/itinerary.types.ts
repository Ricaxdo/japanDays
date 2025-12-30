export type ItineraryDay = {
  day: number;
  date: string;
  location: string;
  description: string;
  icon: string;
};

export type Destination = {
  city: string;
  description: string;
  attractions: string[];
  image: string;
};

export type DayActivity = {
  time?: string;
  title: string;
  note?: string;
  tag?: "must" | "food" | "move" | "chill";
};

export type DayDetails = {
  title?: string;
  summary?: string;
  activities?: DayActivity[];
  tips?: string[];
};

export type Day = ItineraryDay & {
  details?: DayDetails;
};

export type ItinerarySectionProps = {
  days: Day[];
  currentDay: number;
  onChangeDay: (day: number) => void;
};
