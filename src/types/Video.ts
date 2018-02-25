export type Video = {
  id: number;
  name: string;
  date: Date;
  url: string;
  sequences: [number, number, string][];
};
