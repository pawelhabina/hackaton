export type TimeKey = "1926" | "2026" | "2126";

export type LocationData = {
  id: string;
  name: string;
  district: string;
  shortDescription: string;
  lead: string;
  article: string;
  coordinates: {
    lng: number;
    lat: number;
  };
  tags: string[];
  accent: string;
  facts: Array<{
    label: string;
    value: string;
  }>;
  images: Record<TimeKey, string>;
};

export type FuturePillar = {
  title: string;
  description: string;
  accent: string;
};

export type TimelineMilestone = {
  year: string;
  title: string;
  body: string;
};

export type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};
