export type Flag = { name: string; flag: string };
export type RecentItem = {
  name: string;
  time: number;
  flag: string;
  wrong?: boolean;
};
export type Settings = {
  timeMs: number;
  lives: number;
  endMode: "infinite" | "streak";
  streakGoal: number;
};
